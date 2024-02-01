import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { ICart, ICartItem } from '../Models/cart-item';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IProduct } from '../Models/product';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart = new BehaviorSubject<ICart>({ items: [] });
  $cart: Observable<ICart> = this.cart.asObservable();
  private baseUrl = 'http://localhost:3000';

  constructor(private _snackBar: MatSnackBar, private _http: HttpClient) {}

  getItems(): Observable<IProduct[]> {
    //return this._http.get<IProduct[]>("../../assets/Datos/products.json");
    return this._http.get<IProduct[]>(this.baseUrl + "/products");

  }
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
  removeQuantity(item: ICartItem): void {
    let itemForRemoval!: ICartItem;

    let filteredItems = this.cart.value.items.map((_item) => {
      if (_item.id === item.id) {
        _item.quantity--;
        if (_item.quantity === 0) {
          itemForRemoval = _item;
        }
      }

      return _item;
    });

    if (itemForRemoval) {
      filteredItems = this.removeFromCart(itemForRemoval, false);
    }

    this.cart.next({ items: filteredItems });
    this._snackBar.open('1 item removed from cart.', 'Ok', {
      duration: 3000,
    });
  }
  clearCart(): void {
    this.cart.next({ items: [] });
    this._snackBar.open('Cart is cleared.', 'Ok', {
      duration: 3000,
    });
  }

  removeFromCart(item: ICartItem, updateCart = true): ICartItem[] {
    const filteredItems = this.cart.value.items.filter(
      (_item) => _item.id !== item.id
    );

    if (updateCart) {
      this.cart.next({ items: filteredItems });
      this._snackBar.open('1 item removed from cart.', 'Ok', {
        duration: 3000,
      });
    }

    return filteredItems;
  }
}
