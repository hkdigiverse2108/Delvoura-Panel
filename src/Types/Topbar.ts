import type { ApiResponse } from "./common";

export type TopbarPayload = {
  topbarItems?: string[];
  isActive?: boolean;
};

export type Topbar = {
  _id?: string;
  topbarItems?: string[];
  isActive?: boolean;
};

export type TopbarResponse = ApiResponse<Topbar>;