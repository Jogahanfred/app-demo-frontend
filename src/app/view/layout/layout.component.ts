import { Component, HostListener, OnInit, Optional } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { Router, RouterOutlet } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent implements OnInit {
  isMobile = false;
  sidebarCollapsed = false;
  showSidebar = true;

  constructor(private router: Router) {
    this.checkScreenSize();
  }

  ngOnInit() {
    this.resolveSidebarVisibility();
  }
  private resolveSidebarVisibility(): void {
    // const role = this.getRole();
    const role: string = 'DIRECTOR';
    this.showSidebar = role === 'ADMIN';
  }

  // private getRole(): string | null {
  //   // 1) si el AuthService expone getRole()
  //   if (this.authService && typeof this.authService.getRole === 'function') {
  //     try {
  //       return this.authService.getRole();
  //     } catch {
  //       /* ignore */
  //     }
  //   }

  //   // 2) intentar leer un objeto 'user' en localStorage
  //   try {
  //     const userJson = localStorage.getItem('user');
  //     if (userJson) {
  //       const user = JSON.parse(userJson);
  //       if (user && (user.role || user.roles)) {
  //         return (
  //           user.role || (Array.isArray(user.roles) ? user.roles[0] : null)
  //         );
  //       }
  //     }
  //   } catch {
  //     /* ignore parse errors */
  //   }

  //   // 3) fallback: valor simple 'role' en localStorage
  //   return localStorage.getItem('role');
  // }

  @HostListener('window:resize')
  onResize() {
    const prevMobile = this.isMobile;
    this.isMobile = window.innerWidth < 768;

    if (prevMobile !== this.isMobile) {
      this.resetSidebarState();
    }
  }

  checkScreenSize() {
    this.isMobile = window.innerWidth < 768;
  }

  resetSidebarState() {
    if (this.isMobile) {
      this.sidebarCollapsed = false;
    }
  }

  toggleSidebar() {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }

  onSidebarToggle(collapsed: boolean) {
    this.sidebarCollapsed = collapsed;
  }
}
