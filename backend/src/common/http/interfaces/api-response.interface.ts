import { TypePaginationMeta } from '../types/pagination';

export interface IApiResponse<T> {
  data: T;
  meta: {
    pagination?: TypePaginationMeta;
  } | null;
  message: {
    code: string | null;
  };
}
