import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, DialogModule, ButtonModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  /** Controla la visibilidad del modal */
  @Input() visible = false;

  /** Título del modal */
  @Input() title = '';

  /** Ancho del modal (por defecto 600px) */
  @Input() width = '600px';

  /** Si muestra el botón de cerrar (X) */
  @Input() closable = true;

  /** Texto de los botones */
  @Input() saveLabel = 'Guardar';
  @Input() cancelLabel = 'Cerrar';

  /** Controla si se muestran los botones de acción */
  @Input() showFooter = true;

  /** Controla si se muestra el botón de guardar */
  @Input() showSaveButton = true;

  /** Deshabilita el botón de guardar */
  @Input() saveDisabled = false;

  /** Muestra un loader en el botón de guardar */
  @Input() saving = false;

  /** Emite cuando el usuario confirma/guarda */
  @Output() save = new EventEmitter<void>();

  /** Emite cuando el usuario cierra o cancela */
  @Output() cancel = new EventEmitter<void>();

  /** Emite cuando el modal cambia de visibilidad */
  @Output() visibleChange = new EventEmitter<boolean>();

  onHide(): void {
    this.visibleChange.emit(false);
    this.cancel.emit();
  }

  onSave(): void {
    this.save.emit();
  }
}
