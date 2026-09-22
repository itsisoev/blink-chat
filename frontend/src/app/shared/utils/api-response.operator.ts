import { HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { CommonCode } from '@core/enums/api-code';
import { IApiResponse } from '@core/interfaces/http/api-response.interface';
import { ToastrService } from '@core/services/toastr/toastr.service';
import { isApiCode } from '@core/utils/api-code.util';
import { ApiCode } from '@core/types';

export function handleApiResponse<T>(
  notification: ToastrService,
  options: { showSuccess?: boolean } = {},
) {
  return (source: Observable<IApiResponse<T>>): Observable<IApiResponse<T>> =>
    source.pipe(
      tap((response) => {
        const code = response.message?.code;

        if (options.showSuccess && isApiCode(code)) {
          notification.success(code);
        }
      }),

      catchError((error: unknown) => {
        const code = extractErrorCode(error);

        notification.error(code);

        return throwError(() => error);
      }),
    );
}

function extractErrorCode(error: unknown): ApiCode {
  if (!(error instanceof HttpErrorResponse)) {
    return CommonCode.INTERNAL_SERVER_ERROR;
  }

  const body: unknown = error.error;

  if (typeof body !== 'object' || body === null) {
    return CommonCode.INTERNAL_SERVER_ERROR;
  }

  const message = (body as Record<string, unknown>)['message'];

  if (typeof message !== 'object' || message === null) {
    return CommonCode.INTERNAL_SERVER_ERROR;
  }

  const code = (message as Record<string, unknown>)['code'];

  if (isApiCode(code)) {
    return code;
  }

  return CommonCode.INTERNAL_SERVER_ERROR;
}
