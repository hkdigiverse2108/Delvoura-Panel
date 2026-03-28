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
export type UserResponse = Record<string, unknown>;

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
