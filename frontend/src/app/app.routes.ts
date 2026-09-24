import { Routes } from '@angular/router';
import { authGuard } from '@core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        canActivate: [authGuard],
        loadChildren: () => import('@features/features.routes').then((m) => m.FEATURES_ROUTES),
      },
    ],
  },
  {
    path: 'auth',
    loadChildren: () => import('@features/auth/auth.routes').then((m) => m.AUTH_ROUTES),
  },
];
