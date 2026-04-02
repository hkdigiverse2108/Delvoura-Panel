export interface ContactUs {
  _id: string;
  fullName: string;
  email: string;
  countryCode?: string;
  phone?: string;
  message: string;
  isRead: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ContactUsListData {
  contact_us_data: ContactUs[];
  totalData: number;
  state?: any;
}

export interface ContactUsListResponse {
  status: number;
  message: string;
  data: ContactUsListData;
}