import { IApiResponse } from '../http/interfaces/api-response.interface';

export function createApiErrorResponse(
  code: string | null = null,
): IApiResponse<null> {
  return {
    data: null,
    meta: null,
    message: {
      code,
    },
  };
}
