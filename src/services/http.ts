import type { IErrorResponse } from "@/types/Error.type";
import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
} from "axios";
import toast from "@/common/toast";
import router from "@/router";
import CookieService from "./CookieService";
import { i18n } from "@/i18n";

enum StatusCode {
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  TooManyRequests = 429,
  InternalServerError = 500,
}

const headers: Readonly<Record<string, string | boolean>> = {
  Accept: "application/json",
};

class Http {
  private instance: AxiosInstance = this.initHttp();

  private get http(): AxiosInstance {
    return this.instance;
  }

  initHttp() {
    const http = axios.create({
      baseURL: "http://localhost:3000",
      headers,
      withCredentials: true,
    });

    http.interceptors.request.use(
      (config) => {
        const token = CookieService.getAccessToken();
        config.headers = config.headers ?? {};
        if (token != null) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    http.interceptors.response.use(
      (response) => response.data,
      (error) => {
        const { response } = error;
        return this.handleError(response);
      }
    );

    return http;
  }

  request<T = any, R = AxiosResponse<T>>(
    config: AxiosRequestConfig
  ): Promise<R> {
    return this.http.request(config);
  }

  get<T = any, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.http.get<T, R>(url, config);
  }

  post<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.http.post<T, R>(url, data, config);
  }

  put<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.http.put<T, R>(url, data, config);
  }

  patch<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.http.patch<T, R>(url, data, config);
  }

  delete<T = any, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.http.delete<T, R>(url, config);
  }

  private handleError(error: AxiosError & IErrorResponse) {
    const { status } = error;
    switch (status) {
      case StatusCode.NotFound: {
        // Handle NotFound
        toast.error(error.data.message[0]);
        break;
      }
      case StatusCode.InternalServerError: {
        // Handle InternalServerError
        toast.error(i18n.global.t("errors.somethingWrong"));
        break;
      }
      case StatusCode.Forbidden: {
        // Handle Forbidden
        break;
      }
      case StatusCode.BadRequest: {
        // Handle BadRequest
        break;
      }
      case StatusCode.Unauthorized: {
        // Handle Unauthorized
        const isLoginRoute = error.config?.url?.includes("/auth/login");
        if (!isLoginRoute) {
          router.push("/");
        }
        break;
      }
      case StatusCode.TooManyRequests: {
        // Handle TooManyRequests
        break;
      }
    }

    return Promise.reject(error);
  }
}

export const http = new Http();
