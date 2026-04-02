import type { ApiResponse } from "./common";


export type UserType = {
  _id: string;
  firstName?: string;
  lastName?: string;
  email: string;
  contact?: {
    countryCode?: string;
    phoneNo?: number;
  };
  roles?: string;
  isActive?: boolean;
  
};

export type UserPayload = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;

  contact?: {
    countryCode?: string;
    phoneNo?: number | string;
  };
};

export type UpdateUserPayload = {
    userId : string
    firstName : string
     lastName: string;
  email: string;
  password: string;

  
  contact?: {
    countryCode?: string;
    phoneNo?: number | string;}
  isActive?: boolean;
  
};

export type UpdateUserResponse = Record<string, unknown>;



export type UserResponse = ApiResponse<UserType>;
export type UserListResponse = {
  status: number;
  message: string;
  data: {
    user_data: UserType[];
    totalData: number;
  };
};