export type LoginPayload = {
  email: string;
  password: string;
  loginSource?: string;
};

export type SignupPayload = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  loginSource?: string;
  roles: string
};

export type AuthResponse = {
  data: {
    token: string;
    user?: unknown;
  };
};

export type SigninPayload = {
  token: string;
  user?: unknown;
};


export type AuthState = {
  token: string | null;
  user: unknown | null;
  isAuthenticated: boolean;
  
};




export type LoginResponse = AuthResponse;
export type SignupResponse = AuthResponse;

export type VerifyOtpPayload = {
  email: string;
  otp: string;
};
export type VerifyOtpResponse = Record<string, unknown>;

export type ForgetPasswordPayload = {
  email: string;
};
export type ForgetPasswordResponse = Record<string, unknown>;

export type ResetForgetPasswordPayload = {
  email: string;
  otp: string;
  password: string;
};
export type ResetForgetPasswordResponse = Record<string, unknown>;

