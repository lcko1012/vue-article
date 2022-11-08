export interface IUser {
  id: number;
  name: string;
  email: string;
  role: UserRoleTypes;
  avatarUrl: string;
  about: string | null;
}

export enum UserRoleTypes {
  ADMIN = "admin",
  USER = "user",
}
