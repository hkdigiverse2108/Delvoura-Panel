export type ApiResponse<T = unknown> = {
  status: number;
  message: string;
  data: T;
  error?: unknown;
};

export type MutationResponse<T = unknown> = ApiResponse<T>;

export type StaticPagePayload = {
  content: string;
};



export type Params = Record<
  string,
  string | number | boolean | null | undefined
>;

export type StaticPageResponse = {
  _id?: string;
  content: string;
  createdAt?: string;
  updatedAt?: string;
};