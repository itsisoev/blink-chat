import { DestroyRef, WritableSignal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize, Observable } from 'rxjs';
import { IApiResponse } from '@core/interfaces/http/api-response.interface';
import { ToastrService } from '@core/services/toastr/toastr.service';
import { handleApiResponse } from './api-response.operator';

interface IExecuteRequestHandlers<T> {
  next: (response: IApiResponse<T>) => void;
  error?: (error: unknown) => void;
}

interface IExecuteRequestOptions {
  showSuccess?: boolean;
}

export function executeRequest<T>(
  observable: Observable<IApiResponse<T>>,
  loading: WritableSignal<boolean>,
  destroyRef: DestroyRef,
  notification: ToastrService,
  handlers: IExecuteRequestHandlers<T>,
  options: IExecuteRequestOptions = {},
): void {
  loading.set(true);

  observable
    .pipe(
      handleApiResponse<T>(notification, options),
      takeUntilDestroyed(destroyRef),
      finalize(() => loading.set(false)),
    )
    .subscribe({
      next: handlers.next,
      error: (error: unknown) => {
        handlers.error?.(error);
      },
    });
}
