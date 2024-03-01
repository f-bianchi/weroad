import type { PaginationRequest } from './pagination';

export interface Tour {
  id?: string;
  name: string;
  startingDate: string;
  endingDate: string;
  price: number;
}

export interface TourFilters extends PaginationRequest {
  priceFrom?: number;
  priceTo?: number;
  startingDate?: string;
  endingDate?: string;
}
