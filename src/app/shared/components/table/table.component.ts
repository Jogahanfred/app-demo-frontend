import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { TooltipModule } from 'primeng/tooltip';

export interface TableColumn {
  field: string;
  header: string;
  type?: 'text' | 'chip' | 'icon' | 'date';
  chipOptions?: { activeValue: string; inactiveValue: string };
  iconOptions?: { icon: string; tooltip?: string; action: string }[];
  dateFormat?: string;
  align?: 'left' | 'center' | 'right';
}

@Component({
  selector: 'app-table',
  imports: [
    FormsModule,

    CommonModule,
    TableModule,
    ChipModule,
    ButtonModule,
    ToggleSwitch,
    SelectModule,
    InputTextModule,
    InputIcon,
    IconField,
    TooltipModule,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent {
  @Input() basicTable: boolean = false;
  @Input() highlightedRow?: number;

  @Input() data: any[] = [];
  @Input() columns: TableColumn[] = [];
  @Input() rows = 10;
  @Input() totalRecords = 0;

  @Input() filterFields: { label: string; field: string }[] = [];
  @Input() showGlobalFilter = true;
  @Input() showStatusToggle = false;

  @Output() actionClicked = new EventEmitter<{ action: string; row: any }>();
  @Output() onPageChange = new EventEmitter<any>();
  @Output() onFilterChange = new EventEmitter<{
    field?: string;
    value: string;
    status?: boolean;
  }>();

  globalFilter: string = '';
  selectedFilterField?: string;
  statusFilter: boolean = false;

  applyFilter() {
    this.onFilterChange.emit({
      field: this.selectedFilterField,
      value: this.globalFilter,
      status: this.statusFilter,
    });
  }

  getRowClass = (rowData: any, rowIndex: number) => { 
    if (this.highlightedRow && rowIndex + 1 === this.highlightedRow) {
      return 'highlight-row';
    }
    return '';
  };
}
