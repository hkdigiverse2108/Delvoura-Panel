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
