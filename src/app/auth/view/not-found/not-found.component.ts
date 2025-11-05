import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';

@Component({
  selector: 'app-not-found',
  imports: [CommonModule],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css',
})
export class NotFoundComponent {
  usefulLinks = [
    { label: 'Dashboard', icon: 'pi pi-home', route: '/dashboard' },
    { label: 'Usuarios', icon: 'pi pi-users', route: '/usuarios' },
    { label: 'Reportes', icon: 'pi pi-chart-bar', route: '/reportes' },
    { label: 'Configuración', icon: 'pi pi-cog', route: '/configuracion' },
  ];

  constructor(private router: Router, private location: Location) {}

  goHome() {
    this.router.navigate(['/dashboard']);
  }

  goBack() {
    this.location.back();
  }

  navigate(route: string) {
    this.router.navigate([route]);
  }
}
