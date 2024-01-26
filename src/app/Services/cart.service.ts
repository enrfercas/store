import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { ICart, ICartItem } from '../Models/cart-item';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart = new BehaviorSubject<ICart>({ items: [] });

  constructor(private _snackBar: MatSnackBar) {}

  addToCart(item: ICartItem): void {
    const items = [...this.cart.value.items];

    const itemInCart = items.find((_item) => _item.id === item.id);
    if (itemInCart) {
      itemInCart.quantity += 1;
    } else {
      items.push(item);
    }

    this.cart.next({ items });
    this._snackBar.open('1 item added to cart.', 'Ok', { duration: 3000 });
    console.log(this.cart.value);
  }
}
