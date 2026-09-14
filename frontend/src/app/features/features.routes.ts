import { Routes } from '@angular/router';

export const FEATURES_ROUTES: Routes = [
  {
    path: 'chat/:name',
    loadComponent: () => import('@features/chat/chat.component').then((m) => m.ChatComponent),
  },
];
