import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { ActivatedRouteSnapshot} from '@angular/router';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  //obtener roles permitidos 
  const allowedRoles: string[] = route.data['roles'] ?? [];

  if (!authService.isAuthenticated()) {
    return router.createUrlTree(['/login']);
  }

  //verificar si el usuario tiene un permiso

  if (authService.hasRole(allowedRoles)) {
    return true;
  }

  //usuario esta autenticado pero no tiene permisos  
  return router.createUrlTree(['/sin-acceso']);
};
