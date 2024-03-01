import axios from '@/interceptors/axios-interceptor';
import type { Tour, TourFilters } from '@/models/tour';

export interface TourBody extends Tour {
  travelId: string;
}

export const getTours = async (travelId: string): Promise<Tour[]> => {
  const { data } = await axios.get<Tour[]>(`/admin/travels/${travelId}/tours`);
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

export const getTravelTours = async (slug: string, filters: TourFilters): Promise<Tour[]> => {
  const { data } = await axios.get<Tour[]>(`/travels/${slug}/tours`, { params: filters });
  return data;
};
