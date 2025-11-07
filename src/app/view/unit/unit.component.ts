import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { finalize } from 'rxjs';

import { Table } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { SelectModule } from 'primeng/select';
import { ToastModule } from 'primeng/toast';

import { UnitService } from '../../shared/http/unit.service';
import { Unit } from '../../shared/interface/unit.interface';
import { Response } from '../../core/interface/response.interface';
import { ToastService } from '../../shared/services/toast.service';

import { SpinnerComponent } from '../../shared/components/spinner/spinner.component';
import {
  TableComponent,
  TableColumn,
} from '../../shared/components/table/table.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { InputFieldComponent } from '../../shared/components/input-field/input-field.component';
import { SelectFieldComponent } from '../../shared/components/select-field/select-field.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
@Component({
  selector: 'app-unit',
  standalone: true,
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CardModule,
    SelectModule,
    ButtonComponent,
    SpinnerComponent,
    TableComponent,
    ModalComponent,
    InputFieldComponent,
    SelectFieldComponent,
    ToastModule,
    ConfirmDialogModule,
  ],
  providers: [ConfirmationService, MessageService],
})
export class UnitComponent implements OnInit {
  private readonly messageService = inject(MessageService);
  private readonly confirmationService = inject(ConfirmationService);
  private readonly unitService = inject(UnitService);
  private readonly fb = inject(FormBuilder);
  private readonly toastService = inject(ToastService);

  @ViewChild('dt') dt!: Table;

  /** Signals */
  loading = signal(false);
  units = signal<Unit[]>([]);
  page = signal(1);
  size = signal(5);
  filter = signal('');

  /** Estados */
  totalRecords = 0;
  selectedField?: string;
  statusOnly = false;
  selectedUnits?: Unit[] | null;

  /** Modal */
  showModal = signal(false);
  editing = signal(false);
  saving = signal(false);
  viewMode = signal(false);

  /** Unidad que se está editando */
  editingUnit: Unit | null = null;

  /** Reactive Form */
  unitForm!: FormGroup;

  /** Columnas de la tabla */
  columns: TableColumn[] = [
    { field: 'nuCode', header: 'CÓDIGO' },
    { field: 'coAbbreviation', header: 'SIGLA' },
    { field: 'txDescription', header: 'DESCRIPCIÓN' },
    { field: 'nuLevel', header: 'NIVEL', align: 'center' },
    { field: 'nuRectorCode', header: 'CÓDIGO RECTOR', align: 'center' },
    {
      field: 'flStatus',
      header: 'ESTADO',
      type: 'chip',
      chipOptions: { activeValue: 'ACTIVO', inactiveValue: 'INACTIVO' },
      align: 'center',
    },
    {
      field: 'actions',
      header: 'ACCIONES',
      type: 'icon',
      iconOptions: [
        { icon: 'pi pi-pencil', tooltip: 'Editar', action: 'edit' },
        { icon: 'pi pi-eye', tooltip: 'Ver', action: 'view' },
        { icon: 'pi pi-trash', tooltip: 'Eliminar', action: 'delete' },
      ],
      align: 'center',
    },
  ];

  referencias = [
    { label: 'Código', field: 'coAbbreviation' },
    { label: 'Nombre', field: 'txDescription' },
  ];

  statusOptions = [
    { label: 'Activo', value: 'ACTIVE' },
    { label: 'Inactivo', value: 'INACTIVE' },
  ];

  ngOnInit() {
    this.initForm();
    this.unitService.getUnitChange().subscribe(() => this.loadUnits());
    this.loadUnits();
  }

  /** Inicializar formulario */
  private initForm(): void {
    this.unitForm = this.fb.group({
      nuCode: ['', [Validators.required, Validators.min(100)]],
      coAbbreviation: ['', [Validators.required, Validators.maxLength(5)]],
      txDescription: ['', [Validators.required, Validators.maxLength(255)]],
      nuLevel: ['', [Validators.required]],
      nuRectorCode: ['', [Validators.required]],
      flStatus: ['ACTIVE', Validators.required],
      txImagePath: ['', [Validators.maxLength(255)]],
    });
  }

  /** Obtener control dinámicamente */
  control(name: string): FormControl {
    const ctrl = this.unitForm.get(name);
    if (!ctrl) throw new Error(`Control '${name}' no encontrado en unitForm`);
    return ctrl as FormControl;
  }

  /** Abrir modal */
  openModal(editMode = false, unit?: Unit, view = false): void {
    this.editing.set(editMode);
    this.viewMode.set(view);
    this.showModal.set(true);

    if ((editMode || view) && unit) {
      this.editingUnit = unit;
      this.unitForm.reset();
      this.unitForm.patchValue(unit);

      if (view) {
        // Deshabilitar todos los campos si es solo visualización
        this.unitForm.disable();
      } else {
        this.unitForm.enable();
      }
    } else {
      this.editingUnit = null;
      this.unitForm.reset({ flStatus: 'ACTIVE' });
      this.unitForm.enable();
    }
  }

  /** Guardar datos (crear o editar) */
  onSave(): void {
    if (this.unitForm.invalid) {
      this.unitForm.markAllAsTouched();
      this.toastService.showError(
        'Error',
        'Por favor, complete o verifique los campos incorrectos.'
      );
      return;
    }

    this.saving.set(true);
    this.loading.set(true);

    const payload = this.unitForm.getRawValue();
    const request$ = this.editingUnit
      ? this.unitService.updateUnit(this.editingUnit.nuUnitId!, payload)
      : this.unitService.createUnit(payload);

    request$
      .pipe(
        finalize(() => {
          this.saving.set(false);
          this.loading.set(false);
        })
      )
      .subscribe({
        next: (res: Response) => {
          this.toastService.showSuccess(
            'Éxito',
            res.message ||
              (this.editingUnit
                ? 'Registro editado correctamente.'
                : 'Registro guardado correctamente.')
          );
          this.showModal.set(false);
          this.loadUnits();
          this.editingUnit = null;
          if (!this.editingUnit) this.unitForm.reset({ flStatus: 'ACTIVE' });
        },
        error: (err: any) => {
          console.error('Error al guardar la unidad:', err);
          this.toastService.showError(
            'Error',
            err?.error?.message ||
              err?.message ||
              'Ocurrió un problema al guardar el registro.'
          );
        },
      });
  }

  onDelete(unit: Unit): void {
    if (!unit.nuUnitId) return;

    this.confirmationService.confirm({
      message: `¿Está seguro de eliminar la unidad "${unit.txDescription}"?`,
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Eliminar',
      rejectButtonStyleClass: 'p-button-secondary',
      rejectLabel: 'Cancelar',
      accept: () => {
        this.loading.set(true);
        this.unitService
          .deleteUnit(unit.nuUnitId!)
          .pipe(finalize(() => this.loading.set(false)))
          .subscribe({
            next: () => {
              this.toastService.showSuccess(
                'Éxito',
                'Unidad eliminada correctamente.'
              );
              this.loadUnits();
            },
            error: (err) => {
              console.error('Error al eliminar la unidad:', err.error);
              this.toastService.showError('Error', err.message);
            },
          });
      },
      reject: () => {},
    });
  }

  /** Cancelar modal */
  onCancel(): void {
    this.showModal.set(false);
    this.editingUnit = null;
  }

  /** Cargar unidades */
  loadUnits(): void {
    this.loading.set(true);
    this.unitService
      .getUnitsPage(this.page(), this.size(), this.filter())
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (res: Response) => {
          this.units.set(res.data.content);
          this.totalRecords = res.data.totalElements;
        },
        error: () =>
          this.toastService.showError('Error', 'Error al cargar unidades'),
      });
  }

  /** Acciones de la tabla */
  handleAction(event: { action: string; row: Unit }): void {
    switch (event.action) {
      case 'edit':
        this.openModal(true, event.row);
        break;
      case 'view':
        this.openModal(false, event.row, true);
        break;
      case 'delete':
        this.onDelete(event.row);
        break;
    }
  }

  /** Paginador */
  onPageChange(event: any): void {
    this.page.set(event.first / event.rows + 1);
    this.size.set(event.rows);
    this.loadUnits();
  }

  /** Filtro */
  onFilterTable(event: { field?: string; value: string; status?: boolean }) {
    this.filter.set(event.value);
    this.selectedField = event.field;
    this.statusOnly = event.status || false;
    this.loadUnits();
  }
}
