import { Component, Input } from '@angular/core';
import { ICart } from 'src/app/Models/cart-item';
import { AuthService } from 'src/app/Services/auth.service';
import { CartService } from 'src/app/Services/cart.service';
import { UtilsService } from 'src/app/Services/utils.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  public cart: ICart = { items: [] };
  public itemsQuantity = 0;
  public isLoggedIn: boolean = false;


  constructor(private _cartService: CartService, private auth: AuthService) {

    if(this.auth.isLoggedIn){
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  }

  @Input()
  get cartItems(): ICart {
    return this.cart;
  }

  set cartItems(cart: ICart) {
    this.cart = cart;

    this.itemsQuantity = cart.items
      .map((item) => item.quantity)
      .reduce((prev, curent) => prev + curent, 0);
  }
  clearCart(): void {
    this._cartService.clearCart();
  }
}
