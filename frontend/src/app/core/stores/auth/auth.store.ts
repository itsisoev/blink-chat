import { DestroyRef, inject, signal, Service, computed } from '@angular/core';
import { IAuthUser } from '@core/interfaces/auth';
import { AuthService } from '@core/services/auth/auth.service';
import { TokenStorageService } from '@core/services/token-storage/token-storage.service';
import { ToastrService } from '@core/services/toastr/toastr.service';
import { catchError, Observable, of, tap } from 'rxjs';
import { IApiResponse } from '@core/interfaces/http/api-response.interface';

@Service()
export class AuthStore {
  private readonly authService = inject(AuthService);
  private readonly tokenStorageService = inject(TokenStorageService);

  readonly user = signal<IAuthUser | null>(null);

  readonly isAuthenticated = computed(() => this.user() !== null);

  setUser(user: IAuthUser): void {
    this.user.set(user);
  }

  restoreSession(): Observable<IApiResponse<IAuthUser> | null> {
    if (!this.tokenStorageService.hasAccessToken()) {
      return of(null);
    }

    return this.authService.getProfile().pipe(
      tap((response) => {
        const user = response.data;

        if (user) {
          this.user.set(user);
        }
      }),
      catchError(() => {
        this.clearSession();

        return of(null);
      }),
    );
  }

  clearSession(): void {
    this.user.set(null);
    this.tokenStorageService.clearTokens();
  }
}
