import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenStorageService } from '@core/services/token-storage/token-storage.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenStorageService = inject(TokenStorageService);

  const accessToken = tokenStorageService.getAccessToken();

  if (!accessToken) {
    return next(req);
  }

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return next(authReq);
};
