import { DestroyRef, inject, Service, signal } from '@angular/core';
import { AuthService } from '@core/services/auth/auth.service';
import { ToastrService } from '@core/services/toastr/toastr.service';
import { ILoginRequest, ILoginResponse } from '@core/interfaces/auth';
import { executeRequest } from '@shared/utils/execute-request';
import { Router } from '@angular/router';
import { AuthStore } from '@core/stores/auth/auth.store';

@Service({
  autoProvided: false,
})
export class LoginStore {
  private readonly authService = inject(AuthService);
  private readonly toastrService = inject(ToastrService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);
  private readonly authStore = inject(AuthStore);

  readonly loading = signal(false);
  readonly user = signal<ILoginResponse['user'] | null>(null);

  login(request: ILoginRequest): void {
    if (this.loading()) {
      return;
    }

    executeRequest(
      this.authService.login(request),
      this.loading,
      this.destroyRef,
      this.toastrService,
      {
        next: (response) => {
          const user = response.data?.user;

          if (!user) {
            return;
          }
          this.authStore.setUser(user);
          this.router.navigate(['/']);
          this.user.set(user);
        },
      },
      {
        showSuccess: true,
      },
    );
  }
}
