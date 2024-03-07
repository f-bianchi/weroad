import axios from '@/interceptors/axios-interceptor';
import type { PaginationRequest, PaginationResponse } from '@/models/pagination';
import type { Tour, TourFilters } from '@/models/tour';

export interface TourBody extends Tour {
  travelId: string;
}

export const getTours = async (
  travelId: string,
  pagination: PaginationRequest,
): Promise<PaginationResponse<Tour>> => {
  const { data } = await axios.get<PaginationResponse<Tour>>(`/admin/tours`, {
    params: {
      travelId,
      page: pagination.page,
      pageSize: pagination.pageSize,
    },
  });
  return data;
};

export const getTour = async (id: string): Promise<Tour> => {
  const { data } = await axios.get<Tour>(`/admin/tours/${id}`);
  return data;
};

export const createTour = async (tour: TourBody): Promise<Tour> => {
  const { data } = await axios.post<Tour>('/admin/tours', tour);
  return data;
};

export const updateTour = async (id: string, tour: TourBody): Promise<Tour> => {
  const { data } = await axios.put<Tour>(`/admin/tours/${id}`, tour);
  return data;
};

export const deleteTour = async (id: string): Promise<void> => {
  await axios.delete<Tour>(`/admin/tours/${id}`);
};

export const getTravelTours = async (
  slug: string,
  filters: TourFilters,
): Promise<PaginationResponse<Tour>> => {
  const { data } = await axios.get<PaginationResponse<Tour>>(`/travels/${slug}/tours`, {
    params: filters,
  });
  return data;
};
