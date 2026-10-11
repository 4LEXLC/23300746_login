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

  login(user: Parameters<AuthService['login']>[0]): void {
    this.errorMessage.set('');
    this.authService.login(user).subscribe({
      next: (response) => {
        this.authService.saveToken(response.token, response.role, response.name);
        void this.router.navigate(['/home']);
      },
      error: (error) => {
        console.error('Error de autenticacion:', error);
        this.errorMessage.set(error.status === 401
          ? 'Correo o contraseña incorrectos'
          : 'No se pudo iniciar sesión. Comprueba que el backend esté ejecutándose.');
      },
    });
  }

  credentials: Credentials = {
    email: '',
    password: '',
  };

  onSubmit(): void {
  this.login(this.credentials);
  }
}
