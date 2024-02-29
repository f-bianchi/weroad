import axios from '@/interceptors/axios-interceptor'
import { type PaginationResponse } from '@/models/pagination'
import type { Travel } from '@/models/travel'

export interface TravelBody {
  name: string
  isPublic: boolean
  slug: string
  description: string
  numberOfDays: number
  numberOfNights: number
}

export const getTravels = async (): Promise<Travel[]> => {
  const { data } = await axios.get<Travel[]>('/admin/travels')
  return data
}

export const getTravel = async (id: string): Promise<Travel> => {
  const { data } = await axios.get<Travel>(`/admin/travels/${id}`)
  return data
}

export const createTravel = async (travel: TravelBody): Promise<Travel> => {
  const { data } = await axios.post<Travel>('/admin/travels', travel)
  return data
}

export const updateTravel = async (id: string, travel: TravelBody): Promise<Travel> => {
  const { data } = await axios.put<Travel>(`/admin/travels/${id}`, travel)
  return data
}

export const deleteTravel = async (id: string): Promise<void> => {
  await axios.delete<Travel>(`/admin/travels/${id}`)
}

export const getPublicTravels = async (
  page: number,
  pageSize: number
): Promise<PaginationResponse<Travel>> => {
  const { data } = await axios.get<PaginationResponse<Travel>>('/travels', {
    params: {
      page,
      pageSize
    }
  })
  return data
}
