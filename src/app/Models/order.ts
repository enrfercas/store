import { IProduct } from "./product";
import { IUser } from "./user";

export interface IOrder {

  userId?: string;
  suborders?: ISubOrder[];
  total: number;
}

export interface ISubOrder {

  productId?: string;
  quantity?: number;
  subtotal?: number;
}
