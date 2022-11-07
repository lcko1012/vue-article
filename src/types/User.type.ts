export interface IUser {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl: string;
  about: string | null;
}

enum UserRole {
  ADMIN = "admin",
  USER = "user",
}
