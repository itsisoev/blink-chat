export type TypePaginationMeta = ICursorPagination | IPagePagination;

export interface ICursorPagination {
  type: 'cursor';
  nextCursor: string | null;
  hasMore: boolean;
}

export interface IPagePagination {
  type: 'page';
  page: number;
  size: number;
  totalCount: number;
  totalPages: number;
}
