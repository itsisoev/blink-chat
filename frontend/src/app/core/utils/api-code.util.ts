import { AuthCode, CommonCode, UserCode } from '@core/enums/api-code';
import { ApiCode } from '@core/types';

const API_CODES = new Set<string>([
  ...Object.values(UserCode),
  ...Object.values(CommonCode),
  ...Object.values(AuthCode),
]);

export function isApiCode(value: unknown): value is ApiCode {
  return typeof value === 'string' && API_CODES.has(value);
}
