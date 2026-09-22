import { inject, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable, tap } from 'rxjs';
import {
  ILoginRequest,
  ILoginResponse,
  IRegisterRequest,
  IRegisterResponse,
} from '@core/interfaces/auth';
import { IApiResponse } from '@core/interfaces/http/api-response.interface';
import { TokenStorageService } from '@core/services/token-storage/token-storage.service';

@Service()
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly tokenStorageService = inject(TokenStorageService);

  private readonly apiUrl = `${environment.apiUrl}/auth`;

  register(request: IRegisterRequest): Observable<IApiResponse<IRegisterResponse>> {
    return this.http.post<IApiResponse<IRegisterResponse>>(`${this.apiUrl}/register`, request);
  }

  login(request: ILoginRequest): Observable<IApiResponse<ILoginResponse>> {
    return this.http.post<IApiResponse<ILoginResponse>>(`${this.apiUrl}/login`, request).pipe(
      tap((response) => {
        const tokens = response.data?.tokens;

        if (tokens) {
          this.tokenStorageService.saveTokens(tokens);
        }
      }),
    );
  }
}
