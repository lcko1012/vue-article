import type { IUser } from "@/types/User.type";
import { http } from "./http";

class UserDataService {
  async getProfile(): Promise<IUser> {
    return await http.get("/whoami");
  }
  async updateProfile(data: IUser) {
    return await http.patch("/users/update_profile", data);
  }
}

export default new UserDataService();
