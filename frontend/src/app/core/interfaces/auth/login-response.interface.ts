import { IAuthUser } from '@core/interfaces/auth/auth-user.interface';
import { IAuthTokens } from '@core/interfaces/auth/auth-tokens.interface';

export interface ILoginResponse {
  user: IAuthUser;
  tokens: IAuthTokens;
}
