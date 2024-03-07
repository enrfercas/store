export interface ICartItem {
  img: string;
  name: string;
  price: number;
  quantity: number;
  id: number;
}

export interface ICart{
  items: ICartItem[];
}
