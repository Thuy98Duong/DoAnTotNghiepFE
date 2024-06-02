import { notification } from "antd";
import axios, { AxiosInstance } from "axios";
import { isNetworkError } from "../utils";
import { getServerEndpoint } from "@/config";
axios.interceptors.response.use();
export class ApiInstance {
  private static instance: AxiosInstance;
  private static token: string;
  private constructor() {}
  public static getInstance() {
    if (!this.instance) {
      const token = localStorage.getItem("accessToken") ?? this.token;
      const headers: any = {
        "Content-Type": "application/json",
      };
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      this.instance = axios.create({
        baseURL: getServerEndpoint(),
        headers,
        withCredentials: true,
      });

      this.instance.interceptors.request.use(
        (config) => {
          if (config.headers) {
            const token = localStorage.getItem("accessToken") ?? this.token;
            config.headers["Authorization"] = `Bearer ${token}`;
          }
          return config;
        },
        (error) => {
          return Promise.reject(error);
        }
      );

      this.instance.interceptors.response.use(
        function (response) {
          // Do something with response data
          return response;
        },
        function (error) {
          if (isNetworkError(error)) {
            notification.error({
              message: "Lỗi mạng",
              description: "Vui lòng kiểm tra lại kết nối mạng",
            });
            return Promise.reject("error");
          }
          console.log(error);
          if (error.response?.status === 401) {
            localStorage.removeItem("userInfo");
            window.location.href = "/login";
            // window.location.reload(); // TODO: update to use react router
          }
          console.log("error", error);
          // Do something with response error
          return Promise.reject(error);
        }
      );
    }
    return this.instance;
  }

  public static setToken(token: string) {
    if (this.instance) {
      this.instance.defaults.headers.common.Authorization = `Bearer ${token}`;
    }
    this.token = token;
  }

  public static resetToken() {
    this.instance.defaults.headers.common["Authorization"] = "";
  }
}
