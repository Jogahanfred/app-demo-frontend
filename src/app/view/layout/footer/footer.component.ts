import { Component } from '@angular/core';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
@Component({
  selector: 'app-footer',
  imports: [
    DialogModule, 
    ButtonModule, 
    CardModule,
    DividerModule,
    BadgeModule
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

  visible: boolean = false;

  showDialog(event: Event) {
    event.preventDefault(); // evita que el enlace recargue la página
    // luego muestra el diálogo
    this.visible = true;
  }
}
