import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Credentials } from '../../models/credentials';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  imports: [FormsModule],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  readonly errorMessage = signal('');

  // Envía los datos al backend y, si son correctos, guarda el token y va a home.
  login(user: Parameters<AuthService['login']>[0]): void {
    this.errorMessage.set('');
    this.authService.login(user).subscribe({
      next: (response) => {
        this.authService.saveToken(response.token, response.role, response.name);
        void this.router.navigate(['/home']);
      },
      // Muestra un mensaje según el tipo de error.
      error: (error) => {
        console.error('Error de autenticacion:', error);
        this.errorMessage.set(error.status === 401
          ? 'Correo o contraseña incorrectos'
          : 'No se pudo iniciar sesión. Comprueba que el backend esté ejecutándose.');
      },
    });
  }

  // Datos que el usuario escribe en el formulario.
  credentials: Credentials = {
    email: '',
    password: '',
  };

  // Se ejecuta al enviar el formulario.
  onSubmit(): void {
  this.login(this.credentials);
  }
}
