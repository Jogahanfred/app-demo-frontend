import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

interface User {
  email: string;
  password: string;
  role: 'ADMIN' | 'DIRECTOR' | 'USER';
}

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;

  users: User[] = [
    { email: 'admin@emeal.com', password: '123456', role: 'ADMIN' },
    { email: 'director@emeal.com', password: '123456', role: 'DIRECTOR' },
    { email: 'user@emeal.com', password: '123456', role: 'USER' },
  ];

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      const user = this.users.find(
        (u) => u.email === email && u.password === password
      );

      if (user) {
        localStorage.setItem('userRole', user.role);
        console.log("redirihir")
        this.router.navigate(['views/dashboard']);
      } else {
        alert('Credenciales incorrectas');
      }
    }
  }

  onSignup() {
    alert('Funcionalidad de registro próximamente...');
    // this.toastService.show('info', 'Registro', 'Funcionalidad de registro próximamente...');
  }
}
