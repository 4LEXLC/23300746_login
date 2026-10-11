import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  imports: [],
  selector: 'app-no-access',
  styleUrl: './no-access.css',
  templateUrl: './no-access.html',
})
export class NoAccess {

  constructor(private authService: AuthService, private router: Router) {}

  // Cierra la sesión y regresa al login.
  goBack(): void {
    this.authService.logout();
    void this.router.navigate(['/login']);
  }
}
