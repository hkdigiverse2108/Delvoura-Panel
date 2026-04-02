import type { ApiResponse } from "./common";


export interface MediaItem {
  url: string;
  name: string;
  originalName: string;
}

export interface UploadModalPayload {
  multiple: boolean;
  selected: string[];
  fieldName?: string;
  maxSelection?: number;
}

export type MediaListResponse = ApiResponse<MediaItem[]>;

export type MediaSingleResponse = ApiResponse<MediaItem>;