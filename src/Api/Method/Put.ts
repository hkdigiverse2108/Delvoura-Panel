import axios, { AxiosError, type AxiosRequestConfig } from "axios";
import { HTTP_STATUS } from "../../Constants";

export async function Put<TInput, TResponse>(
  url: string,
  data?: TInput,
  token?: string
): Promise<TResponse> {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const isFormData = data instanceof FormData;

  const TOKEN = localStorage.getItem("token"); 

  const config: AxiosRequestConfig = {
    method: "PUT",
    url: BASE_URL + url,
    headers: {
      Authorization: `Bearer ${token || TOKEN}`, 
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
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

    throw new Error(message);
  }
}