import { Component } from '@angular/core';
import { ICartItem } from 'src/app/Models/cart-item';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  public cart: ICartItem[] = [
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
  ];
  public displayedColumns: string[] = ['product','name','quantity','total', 'action'];

  constructor(){}

  onRemoveQuantity(item:ICartItem){

  }

  onAddQuantity(item:ICartItem) {

  }

  getTotal(){
    return 600;
  }

  onClearCart(){

  }

  onRemoveFromCart(item: ICartItem){

  }

  onCheckout(){}






}
