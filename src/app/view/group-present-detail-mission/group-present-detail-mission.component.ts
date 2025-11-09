import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { TagModule } from 'primeng/tag';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { CardModule } from 'primeng/card';
import { MenuItem } from 'primeng/api';
import { Location } from '@angular/common';
import { ScrollTop } from 'primeng/scrolltop';

@Component({
  selector: 'app-group-present-mission',
  imports: [
    CardModule,
    ButtonComponent,
    RouterModule,
    BreadcrumbModule,
    TagModule,
    AvatarModule,ScrollTop
  ],
  templateUrl: './group-present-detail-mission.component.html',
  styleUrl: './group-present-detail-mission.component.css',
})
export class GroupPresentDetailMissionComponent {
  constructor(private location: Location) {}
  items: MenuItem[] = [
    { label: 'Panel Director' },
    { label: 'Programas de Instrucción' },
    { label: 'Detalle de Grupo' },
    { label: 'Programas' },
  ];
  home: MenuItem | undefined = { icon: 'pi pi-home', url: '/' };
  goBack() {
    this.location.back();
  }
}
