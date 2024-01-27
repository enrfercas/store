import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatListOption, MatSelectionList } from '@angular/material/list';
import { IProduct } from 'src/app/Models/product';
import { CartService } from 'src/app/Services/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public value: string = 'Search a product';
  public categories: string[] = ['computer', 'cell phone', 'keyboard'];
  public products: IProduct[] = [];

  @ViewChild('menuCategories') menuCategories: MatSelectionList | undefined;


  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getItems().subscribe((data)=>{ this.products = data});
  }

  // Esta función se puede llamar para obtener los valores seleccionados
  getSelectedCategories(): string[] | void {
    if (this.menuCategories) {
      console.log(this.menuCategories.selectedOptions.selected.map((option: MatListOption) => option.value));
      return this.menuCategories.selectedOptions.selected.map((option: MatListOption) => option.value);
    }
  }

  showArray() {
    let array = this.getSelectedCategories();
    console.log(array);
  }
  onAddToCart(product: IProduct): void {
    this.cartService.addToCart({
      product: product.img,
      name: product.title,
      price: product.price,
      quantity: 1,
      id: product.id,
    });
  }
}
