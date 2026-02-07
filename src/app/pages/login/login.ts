import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { Api } from '../../services/api';
import { UserDataService } from '../../services/user-data';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {

  // Servicios
  private fb = inject(FormBuilder);
  private api = inject(Api);
  private userDataService = inject(UserDataService);
  private router = inject(Router);

  // Estado
  loginForm!: FormGroup;
  loading = false;
  error = '';

  constructor() {
    // Crear formulario
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    // Si ya hay sesión, redirigimos
    if (this.userDataService.isLogged()) {
      this.router.navigate(['/app']);
}
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.error = 'Por favor completa el formulario correctamente';
      return;
    }

    this.loading = true;
    this.error = '';

    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    this.api.login({ email, password }).subscribe({
      next: (response) => {
        console.log('Login exitoso:', response);

        // 1️⃣ Guardar en el servicio (memoria)
        this.userDataService.setUser(response.user ?? null, response.token);

        // 2️⃣ Guardar en localStorage (CLAVE PARA EL BACKEND)
        localStorage.setItem('token', response.token);

        this.loading = false;

        // Redirigir
       this.router.navigate(['/app']);
      },
      error: (err) => {
        console.error('Error en login:', err);
        this.loading = false;
        this.error =
          err.error?.error ||
          'Error en el inicio de sesión. Verifica tus credenciales.';
      }
    });
  }
}