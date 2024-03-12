import { IProduct } from "./product";
import { IUser } from "./user";

export interface IOrder {

  product: IProduct;
  user: IUser;
  cardNumber?: number;
  cvv?: number;
  expiry?: number;
}
