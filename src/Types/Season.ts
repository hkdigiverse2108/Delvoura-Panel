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
