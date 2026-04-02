// Types/StaticPage.ts
import type { ApiResponse } from "./common";

export type StaticPagePayload = {
  content: string;
};

export type StaticPageResponse = {
  _id?: string;
  content: string;
  createdAt?: string;
  updatedAt?: string;
  
};

export type StaticPageSingleResponse = ApiResponse<StaticPageResponse>;

export type StaticPageListResponse = {
  status: number;
  message: string;
  data: {
    terms_service_data?: StaticPageResponse[];
    terms_conditions_data?: StaticPageResponse[];
    privacy_policy_data?: StaticPageResponse[];
    refund_policy_data?: StaticPageResponse[];
    return_exchange_data?: StaticPageResponse[];
    totalData?: number;
  };
};