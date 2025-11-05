import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
 loginForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    // private authService: AuthService,
    // private toastService: ToastService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.loading = true;
      
      const { email, password } = this.loginForm.value;
      
      // this.authService.login(email, password).subscribe({
      //   next: (response) => {
      //     this.toastService.show('success', '¡Inicio de sesión exitoso!', 'Redirigiendo al panel principal...');
          
      //     setTimeout(() => {
      //       this.loading = false;
            this.router.navigate(['/dashboard']);
      //     }, 2000);
      //   },
      //   error: (error) => {
      //     this.loading = false;
      //     this.toastService.show('error', 'Error en el inicio de sesión', 'Credenciales incorrectas. Inténtalo de nuevo.');
      //   }
      // });
    }
  }

  onSignup() {
    alert('Funcionalidad de registro próximamente...')
    // this.toastService.show('info', 'Registro', 'Funcionalidad de registro próximamente...');
  }
}