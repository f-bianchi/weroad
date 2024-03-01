export const PAGE_SIZE_DEFAULT = 3;
export interface PaginationResponse<T> {
  items: T[];
  total: number;
}

export interface PaginationRequest {
  page: number;
  pageSize: number;
  sort?: string;
  order?: OrderType;
}

export type OrderType = 'ASC' | 'DESC';
