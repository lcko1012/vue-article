export interface IUser {
  id: number;
  username: string;
  name: string | null;
  email?: string;
  role?: UserRoleTypes;
  avatarUrl: string;
  about: string | null;
  createdAt?: Date;
}

export enum UserRoleTypes {
  ADMIN = "admin",
  USER = "user",
}
