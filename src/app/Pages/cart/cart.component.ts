import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { loadStripe } from '@stripe/stripe-js';
import { Subscription } from 'rxjs';
import { ICart, ICartItem } from 'src/app/Models/cart-item';
import { CartService } from 'src/app/Services/cart.service';
import { UtilsService } from 'src/app/Services/utils.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit, OnDestroy {
  public cart: ICart | undefined;
  private subscription: Subscription;
  public isDesktop: boolean = false;
  public formPayment: FormGroup;

  public displayedColumns: string[] = [
    'product',
    'name',
    'quantity',
    'total',
    'action',
  ];

  constructor(
    private _cartService: CartService,
    private http: HttpClient,
    private utils: UtilsService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.subscription = this._cartService.$cart.subscribe((data) => {
      this.cart = data;
    });

    this.isDesktop = this.utils.isDesktop;
    if (!this.isDesktop) {
      this.displayedColumns.shift();
    }
    this.formPayment = this.fb.group({
      fullname: ['', [Validators.required, Validators.minLength(4)]],
      cardNumber: ['', [Validators.required, Validators.minLength(15)]],
      cvv: ['', [Validators.required]],
      expireDate: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]]
    });
  }
  ngOnInit() {}

  onRemoveQuantity(item: ICartItem) {
    this._cartService.removeQuantity(item);
  }

  onAddQuantity(item: ICartItem) {
    this._cartService.addToCart(item);
  }

  getTotal(items: ICartItem[]): number {
    return items
      .map((item: ICartItem) => item.price * item.quantity)
      .reduce((sum, item) => sum + item);
  }

  onClearCart() {
    this._cartService.clearCart();
  }

  onRemoveFromCart(item: ICartItem) {
    this._cartService.removeFromCart(item);
  }

  onCheckout(): void {
    /* if (this.cart){
      this.http
      .post('http://localhost:4242/checkout/', {
        items: this.cart.items,
      })
      .subscribe(async (res: any) => {
        let stripe = await loadStripe('');
        stripe?.redirectToCheckout({
          sessionId: res.id,
        });
      });
    } */
    if (this.cart) {
      Swal.fire({
        title: 'Do you want to confirm the purchase?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Confirm purchase',
        denyButtonText: `Don't purchase!`,
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire('Purchase confirmed!', '', 'success').then(() => {
            console.log('Purchase confirmed');
            $('#checkoutModal').hide();
            this.router.navigate(['/']);
            /* let modalInstance = document.getElementById('checkoutModal');
            if (modalInstance){
              modalInstance.modal('hide');
              this.router.navigate(['/']);
            } */
            //$('#myModal').modal('hide');

          });
        } else if (result.isDenied) {
          Swal.fire('Cancelled', '', 'info');
          let modalInstance = document.getElementById('checkoutModal');
          if (modalInstance){
            modalInstance.hidden = true;
            this.router.navigate(['/']);
          }
        }
      });
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
