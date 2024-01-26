import { Component } from '@angular/core';
import { ICart, ICartItem } from 'src/app/Models/cart-item';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  public dataSource: ICartItem[];
  public cart: ICart = {items:[
    {
      product: '../../../assets/Prueba.PNG',
      name: 'Prueba',
      price: 150,
      quantity: 1,
      id: 1
    },
    {
      product: '../../../assets/Prueba.PNG',
      name: 'Prueba 2',
      price: 150,
      quantity: 1,
      id: 2
    },
    {
      product: '../../../assets/Prueba.PNG',
      name: 'Prueba 3',
      price: 150,
      quantity: 1,
      id: 3
    },
  ]};

  public displayedColumns: string[] = ['product','name','quantity','total', 'action'];

  constructor(){
    this.dataSource = this.cart.items
  }

  onRemoveQuantity(item:ICartItem){

  }

  onAddQuantity(item:ICartItem) {

  }

  getTotal(items: ICartItem[]): number {
    return items.map((item:ICartItem)=> item.price * item.quantity).reduce((sum, item)=> sum + item);
  }

  onClearCart(){

  }

  onRemoveFromCart(item: ICartItem){

  }

  onCheckout(){}






}
