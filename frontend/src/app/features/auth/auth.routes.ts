import { Routes } from '@angular/router';

export const AUTH_ROUTES: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('@features/auth/login/login.component').then((m) => m.LoginComponent),
    data: {
      showSidebar: false,
    },
  },
  {
    path: 'registration',
    loadComponent: () =>
      import('@features/auth/registration/registration.component').then(
        (m) => m.RegistrationComponent,
      ),
    data: {
      showSidebar: false,
    },
  },
];
