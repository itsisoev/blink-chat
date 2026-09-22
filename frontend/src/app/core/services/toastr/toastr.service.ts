import { inject, Service } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiCode } from '@core/types';
import { RU_MESSAGES } from '@shared/i18n/messages';

@Service()
export class ToastrService {
  private readonly snackBar = inject(MatSnackBar);

  success(code: ApiCode): void {
    this.show(RU_MESSAGES[code], 'success');
  }

  error(code: ApiCode): void {
    this.show(RU_MESSAGES[code], 'error');
  }

  info(code: ApiCode): void {
    this.show(RU_MESSAGES[code], 'info');
  }

  private show(message: string, type: 'success' | 'error' | 'info'): void {
    this.snackBar.open(message, 'Закрыть', {
      duration: 4000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: [`toast-${type}`],
    });
  }
}
