import type { IUser } from "@/types/User.type";
import { http } from "./http";

class UserDataService {
  async getProfile(): Promise<IUser> {
    return await http.get("/whoami");
  }
}

export default new UserDataService();
