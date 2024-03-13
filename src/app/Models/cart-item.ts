export interface ICartItem {
  img: string;
  name: string;
  price: number;
  quantity: number;
  id: number;
  _id?: string;
}

export interface ICart{
  items: ICartItem[];
}
