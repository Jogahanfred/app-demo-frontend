import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ToastService } from '../../shared/services/toast.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  providers: [MessageService, ToastService],
  imports: [CommonModule, ButtonModule, ToastModule, DialogModule, InputTextModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  encapsulation: ViewEncapsulation.None,
})
export class DashboardComponent implements OnInit {
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
