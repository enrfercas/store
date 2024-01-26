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
  public products: IProduct[] = [
    {
      img: '../../../assets/Prueba.PNG',
      title: 'Prueba',
      price: 250,
      category: 'computer',
      id: 2,
      description: 'Un gran computer para probar código'
    },
    {
      img: '../../../assets/Prueba.PNG',
      title: 'Prueba',
      price: 350,
      category: 'computer',
      id: 2,
      description: 'Un gran computer para probar código'
    },
    {
      img: '../../../assets/Prueba.PNG',
      title: 'Prueba',
      price: 150,
      category: 'computer',
      id: 4,
      description: 'Un gran computer para probar código'
    },
    {
      img: '../../../assets/Prueba.PNG',
      title: 'Prueba',
      price: 650,
      category: 'computer',
      id: 5,
      description: 'Un gran computer para probar código'
    },
    {
      img: '../../../assets/Prueba.PNG',
      title: 'Prueba',
      price: 850,
      category: 'computer',
      id: 6,
      description: 'Un gran computer para probar código'
    },
    {
      img: '../../../assets/Prueba.PNG',
      title: 'Prueba',
      price: 190,
      category: 'computer',
      id: 7,
      description: 'Un gran computer para probar código'
    },
  ]
  ;

  @ViewChild('menuCategories') menuCategories: MatSelectionList | undefined;
  @Output() addToCart: EventEmitter<IProduct> = new EventEmitter();

  constructor(private cartService: CartService) {}

  ngOnInit(): void {}

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
    this.addToCart.emit(product);
    this.cartService.addToCart({
      product: product.img,
      name: product.title,
      price: product.price,
      quantity: 1,
      id: product.id,
    });
  }
}
