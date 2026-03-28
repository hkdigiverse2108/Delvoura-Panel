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
