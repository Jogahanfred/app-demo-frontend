import { CommonModule } from '@angular/common';
import { Component, Input, forwardRef, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormControl,
  ReactiveFormsModule,
  NG_VALIDATORS,
  Validator,
  ValidationErrors,
} from '@angular/forms';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    InputIcon,
    IconFieldModule,
  ],
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
    },
  ],
})
export class InputFieldComponent
  implements ControlValueAccessor, Validator, OnInit
{
  @Input() label = '';
  @Input() icon = '';
  @Input() placeholder = '';
  @Input() type: 'text' | 'email' | 'number' = 'text';
  @Input() required = false;

  @Input() control?: FormControl;

  value: string = '';
  disabled = false;

  onChange: (_: any) => void = () => {};
  onTouched: () => void = () => {};

  ngOnInit() {
    if (this.control) {
      // Inicializar el valor
      this.value = this.control.value ?? '';

      // Inicializar el estado disabled desde el FormControl
      this.disabled = this.control.disabled;

      // Suscribirse a cambios de valor
      this.control.valueChanges.subscribe((val) => {
        this.value = val;
      });

      // Suscribirse a cambios de estado (enabled/disabled)
      this.control?.statusChanges?.subscribe(() => {
        this.disabled = this.control?.disabled ?? false;
      });
    }
  }
  
  get showError(): boolean {
    if (!this.control) return false;
    return this.control.invalid && (this.control.touched || this.control.dirty);
  }

  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.value = input.value;

    // Actualiza el ControlValueAccessor
    this.onChange(this.value);

    // Actualiza el FormControl directamente
    if (this.control) {
      this.control.setValue(this.value, { emitEvent: false });
    }
  }

  onBlur() {
    this.onTouched();
    // solo marcar touched si el usuario interactúa
    this.control?.markAsTouched();
  }

  // ControlValueAccessor
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
    this.disabled = isDisabled;

    // También sincronizamos con el control si existe
    if (this.control) {
      if (isDisabled) {
        this.control.disable({ emitEvent: false });
      } else {
        this.control.enable({ emitEvent: false });
      }
    }
  }

  get isRequired(): boolean {
    if (!this.control || !this.control.validator) return false;
    const validator = this.control.validator({} as FormControl);
    return validator ? !!validator['required'] : false;
  }

  // Validator
  validate(): ValidationErrors | null {
    if (!this.control) return null;
    return this.control.invalid ? this.control.errors : null;
  }
}
