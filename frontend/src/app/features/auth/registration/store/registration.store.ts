import { DestroyRef, inject, signal, Service } from '@angular/core';
import { IRegisterRequest, IRegisterResponse } from '@core/interfaces/auth';
import { AuthService } from '@core/services/auth/auth.service';
import { ToastrService } from '@core/services/toastr/toastr.service';
import { executeRequest } from '@shared/utils/execute-request';
import { Router } from '@angular/router';

@Service({
  autoProvided: false,
})
export class RegistrationStore {
  private readonly authService = inject(AuthService);
  private readonly toastrService = inject(ToastrService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);

  readonly loading = signal(false);
  readonly user = signal<IRegisterResponse | null>(null);

  register(request: IRegisterRequest): void {
    if (this.loading()) {
      return;
    }

    executeRequest(
      this.authService.register(request),
      this.loading,
      this.destroyRef,
      this.toastrService,
      {
        next: (response) => {
          const user = response.data;

          if (!user) {
            return;
          }

          this.user.set(user);
          this.router.navigate(['/auth/login']);
        },
      },
      {
        showSuccess: true,
      },
    );
  }
}
