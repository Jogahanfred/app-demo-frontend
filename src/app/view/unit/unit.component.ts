import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
  ViewChild,
  inject,
  signal,
  effect,
} from '@angular/core';
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

import { UnitService } from '../../shared/http/unit.service';
import { Response } from '../../core/interface/response.interface';
import { Unit } from '../../shared/interface/unit.interface';

import { SpinnerComponent } from '../../shared/components/spinner/spinner.component';
import {
  TableComponent,
  TableColumn,
} from '../../shared/components/table/table.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { InputFieldComponent } from '../../shared/components/input-field/input-field.component';

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
  ],
})
export class UnitComponent implements OnInit {
  private readonly unitService = inject(UnitService);
  private readonly fb = inject(FormBuilder);

  @ViewChild('dt') dt!: Table;

  /** Signals */
  public loading = signal(false);
  public units = signal<Unit[]>([]);
  public page = signal(1);
  public size = signal(5);
  public filter = signal('');

  /** Estados */
  public totalRecords = 0;
  public selectedField?: string;
  public statusOnly = false;
  public selectedUnits?: Unit[] | null;

  /** Modal */
  showModal = false;
  editing = false;
  saving = false;

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

  get codeControl(): FormControl {
    return this.unitForm.get('nuCode') as FormControl;
  }

  ngOnInit() {
    this.initForm();
    this.unitService.getUnitChange().subscribe(() => this.loadUnits());
    this.loadUnits();
  }

  /** Inicializar formulario */
  private initForm(): void {
    this.unitForm = this.fb.group({
      nuCode: ['', [Validators.required, Validators.minLength(3)]],
      txDescription: ['', [Validators.required, Validators.maxLength(20)]],
      flStatus: ['ACTIVE', Validators.required],
    });
  }

  /** Abrir modal */
  openModal(editMode = false, data?: Unit): void {
    this.editing = editMode;
    this.showModal = true;

    if (editMode && data) {
      this.unitForm.patchValue(data);
    } else {
      this.unitForm.reset({ flStatus: 'ACTIVE' });
    }
  }

  /** Guardar datos */
  onSave(): void {
    if (this.unitForm.invalid) return;

    this.saving = true;
    const payload = this.unitForm.value;

    setTimeout(() => {
      console.log(this.editing ? '📝 Editando:' : '🆕 Creando:', payload);
      this.saving = false;
      this.showModal = false;
    }, 1000);
  }

  onCancel(): void {
    this.showModal = false;
  }

  /** Cargar data */
  loadUnits(): void {
    this.loading.set(true);
    this.unitService
      .getPageUnitsInit(this.page(), this.size(), this.filter())
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (response: Response) => {
          this.units.set(response.data.content);
          this.totalRecords = response.data.totalElements;
        },
        error: (err) => console.error('Error al cargar unidades', err),
      });
  }

  /** Acciones de la tabla */
  handleAction(event: { action: string; row: Unit }): void {
    switch (event.action) {
      case 'edit':
        this.openModal(true, event.row);
        break;
      case 'view':
        console.log('👁 Ver registro:', event.row);
        break;
      case 'delete':
        console.log('🗑 Eliminar registro:', event.row);
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
