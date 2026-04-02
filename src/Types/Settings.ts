import type { ApiResponse } from "./common";

export type SocialMediaLinks = {
  facebook?: string;
  twitter?: string;
  instagram?: string;
  linkedin?: string;
};

export type Settings = {
  _id?: string;

  logo?: string;

  isRazorpay?: boolean;
  razorpayApiKey?: string;
  razorpayApiSecret?: string;

  isPhonePe?: boolean;
  phonePeApiKey?: string;
  phonePeApiSecret?: string;
  phonePeVersion?: string | number;

  link?: string;
  address?: string;
  phoneNumber?: string;
  email?: string;

  socialMediaLinks?: SocialMediaLinks;
};

export type SettingsResponse = ApiResponse<Settings>;