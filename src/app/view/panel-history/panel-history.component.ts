import { Component, OnInit, signal } from '@angular/core';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { InputFieldComponent } from '../../shared/components/input-field/input-field.component';
import { Router } from '@angular/router';
import { SpinnerComponent } from '../../shared/components/spinner/spinner.component';
import { InputTextModule } from 'primeng/inputtext';
import { IconField, IconFieldModule } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
@Component({
  selector: 'app-panel-history',
  imports: [
    CommonModule,
    CardModule,
    SpinnerComponent,
    ModalComponent, 
    InputTextModule, 
    IconFieldModule,
    InputFieldComponent
  ],
  templateUrl: './panel-history.component.html',
  styleUrl: './panel-history.component.css',
})
export class PanelHistoryComponent {
  loading = signal(false);
  showModal = signal(false);
  isSearch = signal(false);

  constructor(private router: Router) {}

  openModal(): void {
    this.showModal.set(true);
  }

  selectProgram(item: string) {
    if (item === 'PDE') {
      this.showModal.set(true);
      return;
    }

    if (item === 'PDI') {
      return;
    }
  }
  onCancel(): void {
    this.showModal.set(false);
  }

  handleSearch() {
    this.isSearch.set(true);
    this.loading.set(true);
    setTimeout(() => {
      this.isSearch.set(false);
      this.navigateToPersonHistory();
      this.loading.set(false);
    }, 2000);
  }

  navigateToPersonHistory() {
    this.router.navigate(['views/group-history']);
  }
}
