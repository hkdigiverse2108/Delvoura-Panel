export type ProductVariant = {
  size: string;
  price?: number;
};

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

export type ProductResponse = {
  statusCode: number;
  message: string;
  data: any;
};

export type UpdateProductResponse = {
  statusCode: number;
  message: string;
  data: any;
};