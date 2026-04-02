export interface Newsletter {
  _id: string;
  email: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface NewsletterListResponse {
  success: boolean;
  message: string;
  data: {
    newsletter_data: Newsletter[];
    totalData: number;
    state: {
      page: number;
      limit: number;
      totalPages: number;
    };
  };
}