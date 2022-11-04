import type { IUser } from "@/types/User.type";
import type { ILogin } from "@/views/LoginView.vue";
import { http } from "./http";

interface ILoginResponse {
  user: IUser;
  accessToken: string;
}

class AuthDataService {
  async login(data: ILogin): Promise<ILoginResponse> {
    return await http.post("/auth/login", data);
  }
}

export default new AuthDataService();
