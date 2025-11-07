import { CommonModule } from '@angular/common';
import { Component, Input, forwardRef } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormControl,
  ReactiveFormsModule,
  NG_VALIDATORS,
} from '@angular/forms';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputTextModule, InputIcon, IconFieldModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputFieldComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => InputFieldComponent),
      multi: true,
    }
  ],
})
export class InputFieldComponent implements ControlValueAccessor {
  // --- Inputs configurables ---
  @Input() label: string = '';
  @Input() icon: string = '';
  @Input() placeholder: string = '';
  @Input() type: 'text' | 'email' | 'number' = 'text';
  @Input() required: boolean = false;

  // Recibe el FormControl desde el formulario padre
  @Input() control?: FormControl;

  // --- Valor interno del componente ---
  value: any = '';

  // --- Funciones de ControlValueAccessor ---
  onChange: (_: any) => void = () => {};
  onTouched: () => void = () => {};

  // --- Actualiza el valor y notifica al formulario ---
  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.onChange(this.value);
  }

  // --- ControlValueAccessor ---
  writeValue(value: any): void {
    this.value = value ?? '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // Opcional: habilitar/deshabilitar el input
  }
}
