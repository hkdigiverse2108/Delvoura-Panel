import type { ApiResponse } from "./common";

export type CollectionPayload = {
    image: string;   
  name: string;
  isActive?: boolean;
};
export type CollectionResponse = Record<string, unknown>;

export type UpdateCollectionPayload = {
    image: string;
  collectionId: string;
  name: string;
  isActive?: boolean;
};

export type UpdateCollectionResponse = Record<string, unknown>;


export type Collection = {
  _id: string;
  image: string;
  name: string;
  isActive?: boolean;
};


export type CollectionSingleResponse = ApiResponse<Collection>;

export type CollectionListResponse = ApiResponse<{
  collection_data: Collection[];
  totalData: number;
}>;

export type SelectOption = {
  label: string;
  value: string;
};