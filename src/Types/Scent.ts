import type { ApiResponse } from "./common";

export type ScentPayload = {
  name: string;
  isActive?: boolean;
};
export type ScentResponse = Record<string, unknown>;

export type UpdateScentPayload = {
  scentId: string;
  name: string;
  isActive?: boolean;
};

export type UpdateScentResponse = Record<string, unknown>;

export type Scent = {
  _id: string;
  name: string;
  isActive?: boolean;
};
export type ScentListResponse = ApiResponse<{
  scent_data: Scent[];
  totalData: number;
}>;

export type ScentSingleResponse = ApiResponse<Scent>;