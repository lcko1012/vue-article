import type { IUser } from "@/types/User.type";

export type IState = {
  user: IUser | null;
  isLogged: boolean;
};

export const state: IState = {
  user: null,
  isLogged: false,
};
