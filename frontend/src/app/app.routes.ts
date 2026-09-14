import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadChildren: () => import('@features/features.routes').then((m) => m.FEATURES_ROUTES),
      },
    ],
  },
];
