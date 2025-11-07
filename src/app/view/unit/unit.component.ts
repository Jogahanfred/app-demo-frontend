import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Table, TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputIcon } from 'primeng/inputicon';
import { IconField } from 'primeng/iconfield';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { SelectModule } from 'primeng/select';
import { ChipModule } from 'primeng/chip';
import { BadgeModule } from 'primeng/badge';
import { finalize } from 'rxjs';

import { UnitService } from '../../shared/http/unit.service';
import { Response } from '../../core/interface/response.interface';
import { Unit } from '../../shared/interface/unit.interface';
import { SpinnerComponent } from '../../shared/components/spinner/spinner.component';
import { TagModule } from 'primeng/tag';
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
    InputIcon,
    IconField,
    ToggleSwitch,
    SelectModule,
    BadgeModule,
    ChipModule,
    SpinnerComponent,
    TagModule,
  ],
})
export class UnitComponent implements OnInit {
  // ✅ signals
  public loading = signal(false);
  public units = signal<Unit[]>([]);

  // ✅ Estado de paginación / filtro
  public page = signal(1);
  public size = signal(5);
  public totalRecords = 0;
  public filter = signal('');

  // ✅ referencia a la tabla
  @ViewChild('dt') dt!: Table;

  private readonly unitService = inject(UnitService);

  referencias = [
    { name: 'Código', code: 'CO' },
    { name: 'Nombre', code: 'NO' },
  ];

  selectedUnits!: Unit[] | null;

  ngOnInit() {
    // Escucha cambios del servicio
    this.unitService.getUnitChange().subscribe(() => this.loadUnits());

    // Carga inicial
    this.loadUnits();
  }

  loadUnits() {
    this.loading.set(true);

    this.unitService
      .getPageUnitsInit(this.page(), this.size(), this.filter())
      .pipe(
        finalize(() => {
          this.loading.set(false);
        })
      )
      .subscribe({
        next: (response: Response) => {
          this.units.set(response.data.content);
          this.totalRecords = response.data.totalElements;
        },
        error: (err) => {
          this.loading.set(false);
          console.error('Error al cargar unidades', err);
        },
      });
  }

  onGlobalFilter(table: Table, event: Event) {
    this.filter.set((event.target as HTMLInputElement).value);
    this.page.set(1);
    this.loadUnits();
  }

  onPageChange(event: any) {
    this.page.set(event.first / event.rows + 1);
    this.size.set(event.rows);
    this.loadUnits();
  }
  getSeverity(status: string) {
    switch (status) {
      case 'true':
        return 'success';
      case 'false':
        return 'danger';
      default:
        return 'info';
    }
  }
}
