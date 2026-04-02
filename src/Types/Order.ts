import type { ApiResponse } from "./common";

export type OrderItem = {
  productId: string;
  quantity: number;
  price: number;
};

export type ShippingAddress = {
  country: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  pinCode: string;
  default?: boolean;
};




export type Order = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  deliveredAt?: string;

  shippingAddress: ShippingAddress[];

  items: OrderItem[];

  subtotal: number;
  total: number;

  currency: string;

  paymentStatus: string;
  orderStatus: string;
number : Number

  createdAt: string;
  

  user?: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
};

export type OrderListResponse = ApiResponse<{
  order_data: Order[];
  totalData: number;
}>;

export type OrderResponse = ApiResponse<Order>;