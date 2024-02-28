import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatListOption, MatSelectionList } from '@angular/material/list';
import { ICartItem } from 'src/app/Models/cart-item';
import { IProduct } from 'src/app/Models/product';
import { CartService } from 'src/app/Services/cart.service';
import { ProductsService } from 'src/app/Services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public searchKey: string = 'Search a product';
  public categories: string[] = [];
  public products: IProduct[] = [];
  public dataSource: IProduct[] = [];


  @ViewChild('menuCategories') menuCategories: MatSelectionList | undefined;

  constructor(private cartService: CartService, private productsService: ProductsService) {}

  ngOnInit(): void {
    this.productsService.getItems().subscribe((data) => {
      this.products = data;
      this.dataSource = data;
      console.log('Data', data);
      this.getCategories();
    });
    this.onFilter();
  }

  onFilter(): void {
    const filterCategories = this.getSelectedCategories();
    this.dataSource = this.products;
    if (filterCategories) {
      if (filterCategories.length > 0) {
        let fiteredProducts: IProduct[][] = filterCategories.map((category) =>{
          let subFiltered = this.products.filter((product)=>{
            return product.category === category;
          });
          return subFiltered;
        });
        this.dataSource = fiteredProducts.flat(1);
      }
    }
  }

  onSearch(){
    const _searchKey = this.searchKey.toLowerCase();
    if(_searchKey !== 'Search a product') {
      let fiteredProducts: IProduct[] = this.dataSource.filter((product)=>{
        return product.title.toLowerCase().includes(_searchKey);
      });
      this.dataSource = fiteredProducts;
    }
    if(_searchKey === ''){
      this.onFilter();
    }
  }

  onSort(sort:string) {
    if(sort === 'asc') {
      this.dataSource.sort((a,b) => a.price - b.price);
    }else {
      this.dataSource.sort((a,b) => b.price - a.price);
    }
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

  getCategories() {

    this.products.map((product) => {
      if (!this.categories.includes(product.category)) {
        this.categories.push(product.category);
      }
    });
    console.log(this.categories);
  }
  getSelectedCategories(): string[] | void {
    if (this.menuCategories) {
      return this.menuCategories.selectedOptions.selected.map(
        (option: MatListOption) => option.value
      );
    }
  }
}
