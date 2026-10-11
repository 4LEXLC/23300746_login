import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';
import { Login } from './components/login/login';
import { Home } from './components/home/home';
import { roleGuard } from './guards/role-guard';
import { NoAccess } from './components/no-access/no-access';

// Rutas de la app: login, home (solo Administrador) y página de sin acceso.
export const routes: Routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full',
    },
    {
        path: 'login',
        component: Login,
    },
    {
        path: 'home',
        component: Home,
        canActivate: [authGuard, roleGuard],
        data: { roles: ['Administrador'] },
    },
    {
        path: 'sin-acceso',
        component: NoAccess,
    }
];




