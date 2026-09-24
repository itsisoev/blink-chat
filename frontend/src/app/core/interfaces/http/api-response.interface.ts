import { IApiMessage } from '@core/interfaces/http/api-message.interface';

export interface IApiResponse<T> {
  data: T | null;
  meta: unknown | null;
  message: IApiMessage;
}
