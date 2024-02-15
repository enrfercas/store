import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import { Subscription } from 'rxjs';
import { ICart, ICartItem } from 'src/app/Models/cart-item';
import { CartService } from 'src/app/Services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {
  public cart: ICart | undefined;
  private subscription: Subscription;


  public displayedColumns: string[] = ['product','name','quantity','total', 'action'];

  constructor(private _cartService: CartService,private http: HttpClient){
    this.subscription = this._cartService.$cart.subscribe((data)=>{
      this.cart = data;
    });

  }
  ngOnInit() {}

  onRemoveQuantity(item:ICartItem){
    this._cartService.removeQuantity(item);
  }

  onAddQuantity(item:ICartItem) {
    this._cartService.addToCart(item);
  }

  getTotal(items: ICartItem[]): number {
    return items.map((item:ICartItem)=> item.price * item.quantity).reduce((sum, item)=> sum + item);
  }

  onClearCart(){
    this._cartService.clearCart();
  }

  onRemoveFromCart(item: ICartItem){
    this._cartService.removeFromCart(item);
  }

  onCheckout(): void {
    if (this.cart){
      this.http
      .post('http://localhost:4242/checkout', {
        items: this.cart.items,
      })
      .subscribe(async (res: any) => {
        let stripe = await loadStripe('pk_live_51Oeg0gDulCATjVZwhmS02nAtGrydkAZpq2mRfKnaTOh1PnaSJ1IscQ93mcN7DMgMXzIMVsXz6dsSAUiXULE6u0Kd0063ifdgRG');
        stripe?.redirectToCheckout({
          sessionId: res.id,
        });
      });
    }

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }






}
