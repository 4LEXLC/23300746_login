import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  imports: [],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  name = this.authService.getName();
  role = this.authService.getRole();

  // Cierra la sesión y regresa al login.
  logout(): void {
    this.authService.logout();
    void this.router.navigate(['/login']);
  }

}
