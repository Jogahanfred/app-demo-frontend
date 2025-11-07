import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Table, TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { ChipModule } from 'primeng/chip';
import { BadgeModule } from 'primeng/badge';
import { TagModule } from 'primeng/tag';
import { finalize } from 'rxjs';

import { UnitService } from '../../shared/http/unit.service';
import { Response } from '../../core/interface/response.interface';
import { Unit } from '../../shared/interface/unit.interface';
import { SpinnerComponent } from '../../shared/components/spinner/spinner.component';
import {
  TableComponent,
  TableColumn,
} from '../../shared/components/table/table.component';

@Component({
  selector: 'app-unit',
  standalone: true,
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    SelectModule,
    BadgeModule,
    ChipModule,
    TagModule,
    SpinnerComponent,
    TableComponent,
  ],
})
export class UnitComponent implements OnInit {
  // Signals
  public loading = signal(false);
  public units = signal<Unit[]>([]);
  public page = signal(1);
  public size = signal(5);
  public filter = signal('');

  // Properties
  public totalRecords = 0;
  public selectedField?: string;
  public statusOnly = false;
  public selectedUnits?: Unit[] | null;

  @ViewChild('dt') dt!: Table;

  // Columnas de la tabla
  columns: TableColumn[] = [
    { field: 'nuCode', header: 'CÓDIGO DE BARRAS' },
    { field: 'coAbbreviation', header: 'REFERENCIA' },
    { field: 'txDescription', header: 'NOMBRE' },
    { field: 'nuLevel', header: 'DATOS', align: 'center' },
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

  // Opciones de filtro por campo
  referencias = [
    { label: 'Código', field: 'coAbbreviation' },
    { label: 'Nombre', field: 'txDescription' },
  ];

  // Services
  private readonly unitService = inject(UnitService);

  ngOnInit() {
    this.unitService.getUnitChange().subscribe(() => this.loadUnits());
    this.loadUnits();
  }

  /** Carga los datos de la tabla */
  loadUnits() {
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

  /** Acción sobre botones de la tabla */
  handleAction(event: { action: string; row: Unit }) {
    console.log('Acción de tabla:', event);
  }

  /** Cambio de paginador */
  onPageChange(event: any): void {
    this.page.set(event.first / event.rows + 1);
    this.size.set(event.rows);
    this.loadUnits();
  }

  /** Filtro personalizado de tabla */
  onFilterTable(event: { field?: string; value: string; status?: boolean }) {
    this.filter.set(event.value);
    this.selectedField = event.field;
    this.statusOnly = event.status || false;
    this.loadUnits();
  }
}
