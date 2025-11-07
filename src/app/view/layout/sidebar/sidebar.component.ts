import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

interface MenuItem {
  label: string;
  icon: string;
  route: string;
  active?: boolean;
}

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnChanges {
  @Input() collapsed = false;
  @Input() isMobile = false;
  @Output() toggleSidebar = new EventEmitter<boolean>();

  sidebarVisible = false;
  
  user = {
    name: 'Andersson Marcos',
    role: 'Administrador',
    avatar: 'AM'
  };

  menuItems: MenuItem[] = [
    { label: 'Dashboard', icon: 'pi pi-home', route: 'views/dashboard' },
    { label: 'Usuarios', icon: 'pi pi-users', route: '/usuarios' },
    { label: 'Registra Mision', icon: 'pi pi-chart-bar', route: 'views/mission-register' },
    { label: 'Generar Mision', icon: 'pi pi-file', route: 'views/mission-generate' },
    { label: 'Escuadron', icon: 'pi pi-calendar', route: 'views/squadron' },
    { label: 'Mensajes', icon: 'pi pi-envelope', route: '/mensajes' },
    { label: 'Escuadron', icon: 'pi pi-calendar', route: 'views/squadron' },
    { label: 'Mensajes', icon: 'pi pi-envelope', route: '/mensajes' },
    { label: 'Escuadron', icon: 'pi pi-calendar', route: 'views/squadron' },
    { label: 'Mensajes', icon: 'pi pi-envelope', route: '/mensajes' },
    { label: 'Escuadron', icon: 'pi pi-calendar', route: 'views/squadron' },
    { label: 'Mensajes', icon: 'pi pi-envelope', route: '/mensajes' },
    { label: 'Configuración', icon: 'pi pi-cog', route: 'views/configuration' }
  ];

  constructor(private router: Router) {
    // Marcar el item activo según la ruta actual
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.setActiveMenuItem(event.url);
    });
    
    // Establecer item activo inicial
    this.setActiveMenuItem(this.router.url);
  }

  ngOnChanges() {
    if (this.isMobile) {
      this.sidebarVisible = this.collapsed;
    }
  }

  setActiveMenuItem(url: string) {
    this.menuItems.forEach(item => {
      item.active = url.startsWith(item.route);
    });
  }

  navigateTo(item: MenuItem) {
    this.router.navigate([item.route]);
    
    // Cerrar sidebar en mobile después de navegar
    if (this.isMobile) {
      this.closeSidebar();
    }
  }

  closeSidebar() {
    if (this.isMobile) {
      this.toggleSidebar.emit(false);
    }
  }
}