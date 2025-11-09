import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { RouterModule } from '@angular/router';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { TagModule } from 'primeng/tag';
import { AvatarModule } from 'primeng/avatar';
import { Location } from '@angular/common';

@Component({
  selector: 'app-group-present-detail',
  imports: [
    CardModule,
    ButtonComponent,
    RouterModule,
    BreadcrumbModule,
    TagModule,
    AvatarModule,
  ],
  templateUrl: './group-present-detail.component.html',
  styleUrl: './group-present-detail.component.css',
})
export class GroupPresentDetailComponent {
  constructor(private location: Location) {}
  items: MenuItem[] = [
    { label: 'Panel Director' },
    { label: 'Programas de Instrucción' },
    { label: 'Detalle de Grupo' },
  ];
  home: MenuItem | undefined = { icon: 'pi pi-home', url: '/' };
  goBack() {
    this.location.back();
  }
}
