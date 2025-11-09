import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ToastService } from '../../shared/services/toast.service';
import { MenuItem, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { BreadcrumbModule } from 'primeng/breadcrumb';

@Component({
  selector: 'app-dashboard',
  standalone: true, 
  imports: [
    CommonModule,  
    ButtonComponent,
    BreadcrumbModule,
    RouterModule,
    CardModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  encapsulation: ViewEncapsulation.None,
})
export class DashboardComponent implements OnInit {
  items: MenuItem[] = [
    { label: 'Dashboard' }
  ];
  home: MenuItem | undefined = { icon: 'pi pi-home', url: '/' };
  private readonly toastService = inject(ToastService);

  ngOnInit(): void {}
  click() {
    this.toastService.showSuccess('Exito', 'Se dio click');
  }
  visible: boolean = false;

  showDialog() {
    this.visible = true;
  }
}
