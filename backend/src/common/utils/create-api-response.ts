import { IApiResponse } from '../http/interfaces/api-response.interface';

export function createApiResponse<T>(
  data: T,
  code: string | null = null,
): IApiResponse<T> {
  return {
    data,
    meta: null,
    message: {
      code,
    },
  };
}
