import { Component, inject } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Api } from '../../services/api';
import { UserDataService } from '../../services/user-data';

@Component({
  selector: 'app-register',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

  // Inyectamos los servicios que necesitamos
  private fb = inject(FormBuilder);
  private api = inject(Api);
  private userDataService = inject(UserDataService);
  private router = inject(Router);

  // Variables del componente
  registerForm!: FormGroup;
  loading = false;
  error = '';
  success = false;

  // Constructor: creamos el formulario con sus campos
  constructor() {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  // Al iniciar el componente, verificamos si ya está logueado
  ngOnInit(): void {
    if (this.userDataService.isLogged()) {
      this.router.navigate(['/home']);
    }
  }

  // Verificar si las contraseñas coinciden
  passwordsMatch(): boolean {
    const password = this.registerForm.get('password')?.value;
    const confirmPassword = this.registerForm.get('confirmPassword')?.value;
    return password === confirmPassword && password !== '';
  }

  // Enviar el formulario al hacer clic en "Registrarse"
  onSubmit(): void {
    // Validamos que el formulario sea válido
    if (this.registerForm.invalid) {
      this.error = 'Por favor completa el formulario correctamente';
      return;
    }

    // Validamos que las contraseñas coincidan
    if (!this.passwordsMatch()) {
      this.error = 'Las contraseñas no coinciden';
      return;
    }

    // Iniciamos la carga
    this.loading = true;
    this.error = '';
    this.success = false;

    // Preparamos los datos (sin confirmPassword)
    const email = this.registerForm.get('email')?.value;
    const password = this.registerForm.get('password')?.value;

    // Llamamos a la API para registrar el usuario
    this.api.register({ email, password }).subscribe({
      // Si el registro fue exitoso
      next: (response) => {
        this.loading = false;
        this.success = true;
        this.registerForm.reset();
        
        // Esperamos 2 segundos y redirigimos al login
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      // Si hay error
      error: (error) => {
        this.loading = false;
        this.error = error.error?.error || 'Error en el registro';
      }
    });
  }

}
