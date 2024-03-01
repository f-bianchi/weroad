import axios from '@/interceptors/axios-interceptor';
import type { User } from '@/models/user';

export const USER_IMAGE =
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80';

export const LOGIN_PATH = '/auth/login';

export const login = async (email: string, password: string): Promise<string> => {
  const { data } = await axios.post<{ access_token: string }>(LOGIN_PATH, {
    email,
    password,
  });
  return data.access_token;
};

export const me = async (): Promise<User> => {
  const { data } = await axios.get<User>('/auth/me');
  data.image = USER_IMAGE; // mock an image
  return data;
};
