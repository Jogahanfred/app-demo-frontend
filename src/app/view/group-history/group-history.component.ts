import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { RouterModule } from '@angular/router';
import { Location } from '@angular/common';

import {
  TableColumn,
  TableComponent,
} from '../../shared/components/table/table.component';
import { DividerModule } from 'primeng/divider';
import { TagModule } from 'primeng/tag';
import { ModalComponent } from '../../shared/components/modal/modal.component';

@Component({
  selector: 'app-group-history',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ButtonComponent,
    BreadcrumbModule,
    FormsModule,
    CardModule,
    ButtonModule,
    AvatarModule,
    InputTextModule,
    TableModule,
    DialogModule,
    BadgeModule,
    RouterModule,
    TableComponent,
    DividerModule,
    TagModule,
    ModalComponent,
  ],
  templateUrl: './group-history.component.html',
  styleUrl: './group-history.component.css',
})
export class GroupHistoryComponent implements OnInit {
  constructor(private location: Location) {}
  // breadcrumb
  items: MenuItem[] = [
    { label: 'Panel Director' },
    { label: 'Legajo Personal' },
  ];
  home: MenuItem | undefined = { icon: 'pi pi-home', url: '/' };

  page = signal(1);
  history = signal([]);
  size = signal(5);
  totalRecords = 0;
  filter = signal('');

  pageRanking = signal(1);

  historyRanking = signal([
    {
      nuRanking: 1,
      txDatos: 'ALF FAP Rivera López, Juan Carlos',
      txFase1: '2do: 17.89',
      txFase2: '1ro: 18.45',
      txFase3: '3ro: 17.00',
      txTotalPromedio: 17.78,
    },
    {
      nuRanking: 2,
      txDatos: 'ALF FAP Torres Díaz, María Elena',
      txFase1: '5to: 16.75',
      txFase2: '3ro: 17.20',
      txFase3: '1ro: 18.90',
      txTotalPromedio: 17.62,
    },
    {
      nuRanking: 3,
      txDatos: 'ALF FAP Gómez Pérez, Luis Alberto',
      txFase1: '1ro: 18.50',
      txFase2: '2do: 17.95',
      txFase3: '2do: 18.00',
      txTotalPromedio: 18.15,
    },
    {
      nuRanking: 4,
      txDatos: 'ALF FAP Fernández Morales, Ana Sofía',
      txFase1: '3ro: 17.50',
      txFase2: '5to: 16.80',
      txFase3: '4to: 17.20',
      txTotalPromedio: 17.17,
    },
    {
      nuRanking: 5,
      txDatos: 'ALF FAP Rodríguez Castillo, Carlos Eduardo',
      txFase1: '4to: 17.20',
      txFase2: '6to: 16.50',
      txFase3: '5to: 16.90',
      txTotalPromedio: 16.87,
    },
    {
      nuRanking: 6,
      txDatos: 'ALF FAP Sánchez Rojas, Laura Valentina',
      txFase1: '6to: 16.80',
      txFase2: '4to: 17.10',
      txFase3: '6to: 16.60',
      txTotalPromedio: 16.83,
    },
    {
      nuRanking: 7,
      txDatos: 'ALF FAP Ramírez Cruz, Javier Andrés',
      txFase1: '7mo: 16.50',
      txFase2: '8vo: 15.90',
      txFase3: '7mo: 16.40',
      txTotalPromedio: 16.27,
    },
    {
      nuRanking: 8,
      txDatos: 'ALF FAP Díaz Flores, Paula Fernanda',
      txFase1: '8vo: 15.80',
      txFase2: '7mo: 16.20',
      txFase3: '8vo: 15.70',
      txTotalPromedio: 15.9,
    },
    {
      nuRanking: 9,
      txDatos: 'ALF FAP Morales Ortiz, Andrés Felipe',
      txFase1: '9no: 15.60',
      txFase2: '10mo: 15.20',
      txFase3: '9no: 15.50',
      txTotalPromedio: 15.43,
    },
    {
      nuRanking: 10,
      txDatos: 'ALF FAP Vargas Molina, Elena Camila',
      txFase1: '10mo: 15.10',
      txFase2: '9no: 15.40',
      txFase3: '10mo: 15.00',
      txTotalPromedio: 15.17,
    },
    {
      nuRanking: 11,
      txDatos: 'ALF FAP Herrera Chávez, Miguel Ángel',
      txFase1: '11ro: 14.90',
      txFase2: '11ro: 14.80',
      txFase3: '11ro: 14.70',
      txTotalPromedio: 14.8,
    },
    {
      nuRanking: 12,
      txDatos: 'ALF FAP Castro Rojas, Valeria Isabel',
      txFase1: '12do: 14.50',
      txFase2: '12do: 14.60',
      txFase3: '12do: 14.40',
      txTotalPromedio: 14.5,
    },
    {
      nuRanking: 13,
      txDatos: 'ALF FAP Jiménez Torres, Sebastián Ricardo',
      txFase1: '13ro: 14.20',
      txFase2: '13ro: 14.30',
      txFase3: '13ro: 14.10',
      txTotalPromedio: 14.2,
    },
    {
      nuRanking: 14,
      txDatos: 'ALF FAP Quispe Vargas, Isabella Fernanda',
      txFase1: '20mo: 12.20',
      txFase2: '20mo: 12.10',
      txFase3: '20mo: 12.30',
      txTotalPromedio: 12.2,
    },
    {
      nuRanking: 15,
      txDatos: 'ALF FAP Moreno Ramírez, Daniela Sofía',
      txFase1: '14to: 14.00',
      txFase2: 'RETIRADO',
      txFase3: 'RETIRADO',
      txTotalPromedio: '-',
    },
    {
      nuRanking: 16,
      txDatos: 'ALF FAP Mendoza Flores, Felipe Antonio',
      txFase1: '15to: 13.90',
      txFase2: 'RETIRADO',
      txFase3: 'RETIRADO',
      txTotalPromedio: '-',
    },
    {
      nuRanking: 17,
      txDatos: 'ALF FAP Paredes Díaz, Camila Lucía',
      txFase1: 'RETIRADO',
      txFase2: 'RETIRADO',
      txFase3: 'RETIRADO',
      txTotalPromedio: '-',
    },
    {
      nuRanking: 18,
      txDatos: 'ALF FAP Cabrera Morales, Ricardo José',
      txFase1: 'RETIRADO',
      txFase2: 'RETIRADO',
      txFase3: 'RETIRADO',
      txTotalPromedio: '-',
    },
    {
      nuRanking: 19,
      txDatos: 'ALF FAP Rivas Ortiz, Sofía Isabel',
      txFase1: '18vo: 12.90',
      txFase2: 'RETIRADO',
      txFase3: 'RETIRADO',
      txTotalPromedio: '-',
    },
    {
      nuRanking: 20,
      txDatos: 'ALF FAP Peña Castro, Diego Alejandro',
      txFase1: '19no: 12.50',
      txFase2: 'RETIRADO',
      txFase3: 'RETIRADO',
      txTotalPromedio: '-',
    },
  ]);

  sizeRanking = signal(5);
  totalRecordsRanking = 0;
  filterRanking = signal('');

  columns: TableColumn[] = [
    { field: 'nuCode', header: 'PROGRAMA' },
    { field: 'coAbbreviation', header: 'FECHA' },
    { field: 'txDescription', header: 'PUNTUACIÓN' },
    { field: 'nuLevel', header: 'ESTADO', align: 'center' },
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

  columnsRanking: TableColumn[] = [
    { field: 'nuRanking', header: 'PUESTO', align: 'center' },
    { field: 'txDatos', header: 'APELLIDOS Y NOMBRES' },
    { field: 'txFase1', header: 'FASE #1: OPERA. INSTU 1', align: 'center' },
    { field: 'txFase2', header: 'FASE #2: TRANSI. AÉREO 2', align: 'center' },
    { field: 'txFase3', header: 'FASE #3: NAVE. OPER. 3', align: 'center' },
    { field: 'txTotalPromedio', header: 'TOTAL / PROMEDIO', align: 'center' },
  ];

  referencias = [
    { label: 'Código', field: 'coAbbreviation' },
    { label: 'Nombre', field: 'txDescription' },
  ];

  statusOptions = [
    { label: 'Activo', value: 'ACTIVE' },
    { label: 'Inactivo', value: 'INACTIVE' },
  ];

  selectedLegajo: any = {
    name: 'Juan Martínez',
    rank: 'Capitán',
    nsa: '812542',
    grade: 'A+',
    specializations: 'Piloto de Caza (F-16)',
    photo: 'https://i.pravatar.cc/150?img=12',
    missions: [
      {
        id: 101,
        date: '2023-11-10',
        type: 'Reconocimiento Aéreo',
        status: 'Completada',
        score: 95,
      },
      {
        id: 102,
        date: '2024-03-22',
        type: 'Entrenamiento de Combate',
        status: 'Completada',
        score: 88,
      },
    ],
  };

  showModal = signal(false);

  ngOnInit() {}

  openModal(): void {
    this.showModal.set(true);
  }

  handleAction(e: any) {}
  onPageChange(e: any) {}
  onFilterTable(e: any) {}
  onCancel(): void {
    this.showModal.set(false);
  }
  goBack() {
    this.location.back();
  }
}
