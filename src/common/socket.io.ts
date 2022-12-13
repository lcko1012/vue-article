import CookieService from "@/services/CookieService";
import io from "socket.io-client";

export const useSocketIO = () => {
  const token = CookieService.getAccessToken();
  const options = token
    ? {
        extraHeaders: {
          authorization: `${
            import.meta.env.VITE_AUTHORIZATION_PREFIX
          } ${token}`,
        },
      }
    : {};
  const socket = io(`${import.meta.env.VITE_API_PATH}/socket/article`, options);
  return {
    socket,
  };
};
