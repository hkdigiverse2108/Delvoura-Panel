// Types/Instagram.ts
import type { ApiResponse } from "./common";

export type InstagramItem = {
  _id: string;
  image: string;
  caption?: string;
  link?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type InstagramListResponse = {
  status: number;
  message: string;
  data: {
    instagram_data: InstagramItem[];
    totalData: number;
  };
};
export type InstagramResponse = ApiResponse<InstagramItem>;

export type InstagramPayload = {
  image: string;
  caption?: string;
  link?: string;
  isActive?: boolean;
};