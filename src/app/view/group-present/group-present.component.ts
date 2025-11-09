import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { RouterModule } from '@angular/router';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { TagModule } from 'primeng/tag';
import { Location } from '@angular/common';

@Component({
  selector: 'app-group-present',
  imports: [
    CardModule,
    ButtonComponent,
    RouterModule,
    BreadcrumbModule,
    TagModule,
  ],
  templateUrl: './group-present.component.html',
  styleUrl: './group-present.component.css',
})
export class GroupPresentComponent {
  constructor(private location: Location) {}
  items: MenuItem[] = [
    { label: 'Panel Director' },
    { label: 'Programas de Instrucción' },
  ];
  home: MenuItem | undefined = { icon: 'pi pi-home', url: '/' };
  goBack() {
    this.location.back();
  }
}
