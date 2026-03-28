

import axios, { AxiosError, type AxiosRequestConfig } from "axios";
import { HTTP_STATUS } from "../../Constants";

export async function Post<TInput, TResponse>(
  url: string,
  data?: TInput,
  token?: string
): Promise<TResponse> {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const isFormData = data instanceof FormData;

  const storedToken = localStorage.getItem("token");
  const finalToken = token || storedToken;

  const headers: Record<string, string> = {
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
  };

  if (
    finalToken &&
    finalToken !== "undefined" &&
    finalToken !== "null"
  ) {
    headers.Authorization = `Bearer ${finalToken}`;
  }

  const config: AxiosRequestConfig = {
    method: "POST",
    url: BASE_URL + url,
    headers,
    data,
  };

  try {
    const response = await axios(config);

    if (
      response.status === HTTP_STATUS.OK ||
      response.status === HTTP_STATUS.CREATED
    ) {
      return response.data as TResponse;
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