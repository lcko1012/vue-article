import Cookies from "universal-cookie";

class CookieService {
  private cookies = new Cookies();

  getAccessToken(): string | null {
    return this.cookies.get("accessToken");
  }
  setAccessToken(value: string): void {
    if (this.getAccessToken()) this.removeAccessToken();
    this.cookies.set("accessToken", value);
  }
  removeAccessToken(): void {
    this.cookies.remove("accessToken");
  }
}

export default new CookieService();
