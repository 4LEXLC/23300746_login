import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  //obtener servio de autenticacion
  const authService = inject(AuthService);
  //obtener el servicio de navegacion
  const router = inject(Router);
  //verificamos is el ususrio tiene una sesion 
  if (authService.isAuthenticated()) {
    return true;
  }

  //si no esta autenticado, redirigimos al login
  return router.createUrlTree(['/login']);
};
