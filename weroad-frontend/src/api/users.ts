import axios from '@/interceptors/axios-interceptor';
import type { User } from '@/models/user';

export interface UserBody {
  email: string,
  password: string,
  roles: string[];
}

export const getUsers = async (): Promise<User[]> => {
  const { data } = await axios.get<User[]>('/admin/users');
  return data;
};

export const getUser = async (id: string): Promise<User> => {
  const { data } = await axios.get<User>(`/admin/users/${id}`);
  return data;
};

export const createUser = async (user: UserBody): Promise<User> => {
  const { data } = await axios.post<User>('/admin/users', user);
  return data;
};

export const updateUser = async (id: string, user: UserBody): Promise<User> => {
  const { data } = await axios.put<User>(`/admin/users/${id}`, user);
  return data;
};

export const deleteUser = async (id: string): Promise<void> => {
  await axios.delete<User>(`/admin/users/${id}`);
};
