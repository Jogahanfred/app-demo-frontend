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
    const role = localStorage.getItem('userRole');
    this.showSidebar = role === 'ADMIN';
  }

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
