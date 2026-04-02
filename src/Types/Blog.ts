import type { ApiResponse } from "./common";

export type Blog = {
  _id: string;
  title: string;
  description?: string;
  content?: string;
  image?: string;
  slug?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type BlogListResponse = {
  status: number;
  message: string;
  data: {
    blog_data: Blog[];
    totalData: number;
  };
};


export type BlogResponse = ApiResponse<Blog>;