import axios, { AxiosError, type AxiosRequestConfig } from "axios";
import { HTTP_STATUS } from "../../Constants";

export async function Delete<TResponse, TInput>(
  url: string,
  data?: TInput,
  token?: string
): Promise<TResponse> {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const TOKEN = localStorage.getItem("token"); 

  const config: AxiosRequestConfig = {
    method: "DELETE",
    url: BASE_URL + url,
    headers: {
      Authorization: `Bearer ${token || TOKEN}`, 
    },
    data,
  };

  try {
    const response = await axios(config);

    if (response.status === HTTP_STATUS.OK) {
      return response.data;
    }

    return null as TResponse;
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;
    const message =
      axiosError.response?.data?.message ||
      axiosError.message ||
      "Something went wrong";

          if (axiosError.response?.status === HTTP_STATUS.UNAUTHORIZED) {
      localStorage.removeItem("token");
      window.location.href = "/login";
      return Promise.reject(
        new Error("Session expired, please login again")
      );
    }
    throw new Error(message);
  }
}