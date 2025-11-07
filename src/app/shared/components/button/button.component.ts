import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent {
  /** Texto del botón */
  @Input() label: string = '';

  /** Clases del ícono, pueden ser PrimeIcons, FontAwesome, etc. */
  @Input() icon: string = '';

  /** Posición del ícono (left | right) */
  @Input() iconPosition: 'left' | 'right' = 'left';

  /** Color o tipo del botón */
  @Input() severity:
    | 'primary'
    | 'success'
    | 'info'
    | 'warn'
    | 'help'
    | 'danger'
    | 'secondary'
    | 'contrast' = 'primary';

  /** Si el botón está deshabilitado */
  @Input() disabled = false;

  /** Si el botón debe ocupar todo el ancho */
  @Input() fullWidth = false;

  /** Si muestra un loader en lugar del ícono */
  @Input() loading = false;

  /** Evento de click */
  @Output() clicked = new EventEmitter<void>();

  onClick(): void {
    if (!this.disabled && !this.loading) this.clicked.emit();
  }
}
