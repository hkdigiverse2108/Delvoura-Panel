import type { ApiResponse } from "./common";

export type SeasonPayload = {
  name: string;
  isActive?: boolean;
};
export type SeasonResponse = Record<string, unknown>;

export type UpdateSeasonPayload = {
  seasonId: string;
  name: string;
  isActive?: boolean;
};

export type UpdateSeasonResponse = Record<string, unknown>;

export type Season = {
  _id: string;
  name: string;
  isActive?: boolean;
};

export type SeasonListResponse = ApiResponse<{
  season_data: Season[];
  totalData: number;
}>;

export type SeasonSingleResponse = ApiResponse<Season>;

