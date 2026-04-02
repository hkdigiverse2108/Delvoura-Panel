export type ProductVariant = {
  size: string;
  price?: number;
};

export interface ProductSubmitData {
  productId?: string;
  name: string;
  title: string;
  mrp: number;
  gender: string;
  collectionIds: string[];
  seasonIds: string[];
  scentIds: string[];
  variants: {
    size: string;
    price: number;
    mrp: number;
  }[];
  ingredients: string[];
  description: string;
  usageTips: string;
  scentStory: string;
  metaTitle: string;
  metaDescription: string;
  images: string[];
}


export type ProductPayload = {
  name: string;
  title?: string;
  images?: string[];
  coverimage?: string;
  mrp?: number;
  seasonIds?: string[];
  gender?: string;
  collectionIds?: string[];
  variants?: ProductVariant[];
  ingredients?: string[];
  description?: string;
  scentIds?: string[];
  usageTips?: string;
  scentStory?: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string[];
  slug?: string;
  isTrending?: boolean;
  brandManufacturerInfo?: string;
  isActive?: boolean;
};

export type UpdateProductPayload = ProductPayload & {
  productId: string;
};


export type Product = ProductPayload & {
  _id: string;
};

export type ProductResponse = {
  statusCode: number;
  message: string;
  data: Product;
};



export type UpdateProductResponse = {
  statusCode: number;
  message: string;
  data: Product;
};
export type ProductListResponse = ApiResponse<{
  product_data: Product[];
  totalData: number;
}>;

export type ApiResponse<T = unknown> = {
  status: number;
  message: string;
  data: T;
  error?: unknown;
};
