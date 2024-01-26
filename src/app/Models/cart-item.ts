export interface ICartItem {
  product: string;
  name: string;
  price: number;
  quantity: number;
  id: number;
}

export interface ICart{
  items: ICartItem[];
}
