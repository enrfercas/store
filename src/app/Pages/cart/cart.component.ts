import { Component, OnInit } from '@angular/core';
import { ICart, ICartItem } from 'src/app/Models/cart-item';
import { CartService } from 'src/app/Services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  public dataSource: ICartItem[] | undefined;
  public cart: ICart | undefined;

  /* public cart: ICart = {items:[
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
  ]}; */

  public displayedColumns: string[] = ['product','name','quantity','total', 'action'];

  constructor(private _cartService: CartService){
    this._cartService.$cart.subscribe((data)=>{
      this.cart = data;
    });

  }
  ngOnInit() {

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
