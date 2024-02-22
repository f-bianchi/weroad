export interface User {
  email: string;
  roles: Role[];
}

export interface Role {
  name: string;
  id: string;
}