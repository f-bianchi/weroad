export const PAGE_SIZE_DEFAULT = 3
export interface PaginationResponse<T> {
  items: T[]
  total: number
}
