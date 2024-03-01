import axios from '@/interceptors/axios-interceptor';
import { type PaginationRequest, type PaginationResponse } from '@/models/pagination';
import type { Moods, Travel } from '@/models/travel';

export interface TravelBody {
  name: string;
  isPublic: boolean;
  slug: string;
  description: string;
  numberOfDays: number;
  moods: Moods;
}

export const getTravels = async (
  pagination: PaginationRequest,
): Promise<PaginationResponse<Travel>> => {
  const { data } = await axios.get<PaginationResponse<Travel>>('/admin/travels', {
    params: {
      page: pagination.page,
      pageSize: pagination.pageSize,
    },
  });
  return data;
};

export const getTravel = async (id: string): Promise<Travel> => {
  const { data } = await axios.get<Travel>(`/admin/travels/${id}`);
  return data;
};

export const createTravel = async (travel: TravelBody): Promise<Travel> => {
  const { data } = await axios.post<Travel>('/admin/travels', travel);
  return data;
};

export const updateTravel = async (id: string, travel: TravelBody): Promise<Travel> => {
  const { data } = await axios.put<Travel>(`/admin/travels/${id}`, travel);
  return data;
};

export const deleteTravel = async (id: string): Promise<void> => {
  await axios.delete<Travel>(`/admin/travels/${id}`);
};

export const getPublicTravels = async (
  pagination: PaginationRequest,
): Promise<PaginationResponse<Travel>> => {
  const { data } = await axios.get<PaginationResponse<Travel>>('/travels', {
    params: {
      page: pagination.page,
      pageSize: pagination.pageSize,
    },
  });
  return data;
};

export const getPublicTravel = async (id: string): Promise<Travel> => {
  const { data } = await axios.get<Travel>(`/travels/${id}`);
  return data;
};
