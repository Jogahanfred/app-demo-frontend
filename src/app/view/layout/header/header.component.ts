import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Input() isMobile = false;
  @Output() sidebarToggle = new EventEmitter<void>();
  
  dropdownOpen = false;
  
  user = {
    name: 'Andersson Marcos',
    email: 'juan.perez@example.com',
    role: 'Administrador',
    avatar: 'AM'
  };

  constructor(
    private router: Router,
    // private authService: AuthService,
    // private toastService: ToastService
  ) {}

  toggleSidebar() {
    this.sidebarToggle.emit();
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  closeDropdown() {
    this.dropdownOpen = false;
  }

  goToProfile() {
    this.closeDropdown();
    this.router.navigate(['/perfil']);
  }

  goToSettings() {
    this.closeDropdown();
    this.router.navigate(['/configuracion']);
  }

  logout() {
    this.closeDropdown();
    alert('Has cerrado sesión exitosamente')
    // this.authService.logout();
    // this.toastService.show('info', 'Sesión cerrada', 'HH');
    this.router.navigate(['/login']);
  }

  // Cerrar dropdown al hacer clic fuera (puedes usar @HostListener o un directive)
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.navbar-right')) {
      this.dropdownOpen = false;
    }
  }
}