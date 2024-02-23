export interface User {
  id? : string;
  email: string;
  roles: Role[];
  image?: string;
}

export interface Role {
  name: RoleName;
  id: string;
}

export enum RoleName {
  Admin = 'admin',
  Editor = 'editor'
}
