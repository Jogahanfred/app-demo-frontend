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
  FormsModule,
} from '@angular/forms';
import { SelectModule } from 'primeng/select';

export interface SelectOption {
  label: string;
  value: any;
}

@Component({
  selector: 'app-select-field',
  templateUrl: './select-field.component.html',
  styleUrls: ['./select-field.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SelectModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectFieldComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => SelectFieldComponent),
      multi: true,
    },
  ],
})
export class SelectFieldComponent
  implements ControlValueAccessor, Validator, OnInit
{
  @Input() label = '';
  @Input() placeholder = 'Seleccione';
  @Input() required = false;
  @Input() control?: FormControl;
  @Input() options: SelectOption[] = [];

  value: any;
  disabled = false;

  onChange: (_: any) => void = () => {};
  onTouched: () => void = () => {};

  ngOnInit() {
    if (this.control) {
      this.value = this.control.value ?? '';
      this.disabled = this.control.disabled;

      this.control.valueChanges.subscribe((val) => {
        this.value = val;
      });

      this.control.statusChanges?.subscribe(() => {
        this.disabled = this.control?.disabled ?? false;
      });
    }
  }
  onSelectChange(val: any) {
    this.value = val;
    this.onChange(val); // Notifica al FormControl
    this.onTouched(); // Marca como touched
    if (this.control) this.control.setValue(val); // Sincroniza con control externo
  }

  writeValue(value: any): void {
    this.value = value ?? null; // <--- importante: null si no hay valor
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
    if (this.control) {
      if (isDisabled) this.control.disable({ emitEvent: false });
      else this.control.enable({ emitEvent: false });
    }
  }

  get isRequired(): boolean {
    if (!this.control || !this.control.validator) return false;
    const validator = this.control.validator({} as FormControl);
    return validator ? validator['required'] === true : false;
  }

  validate(): ValidationErrors | null {
    if (!this.control) return null;
    return this.control.invalid ? this.control.errors : null;
  }
}
