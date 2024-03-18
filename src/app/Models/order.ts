import { IProduct } from "./product";
import { IUser } from "./user";

export interface IOrder {

  userId?: string;
  suborders?: ISubOrder[];
  total: number;
  createdAt? : Date;
  updatedAt? : Date;
}

export interface ISubOrder {

  productId?: string;
  quantity?: number;
  subtotal?: number;
}
