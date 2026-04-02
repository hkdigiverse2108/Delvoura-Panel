export interface Rating {
  _id: string;
  productId: string;
  firstName: string;
  lastName: string;
  email: string;
  description?: string;
  starRating: number;
  createdAt: string;
  updatedAt: string;
}

export interface RatingListResponse {
  success: boolean;
  message: string;
  data: {
    rating_data: Rating[];
    totalData: number;
    state: {
      page: number;
      limit: number;
      totalPages: number;
    };
  };
}