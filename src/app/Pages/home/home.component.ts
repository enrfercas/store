import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatListOption, MatSelectionList } from '@angular/material/list';
import { Router } from '@angular/router';
import { ICartItem } from 'src/app/Models/cart-item';
import { IProduct } from 'src/app/Models/product';
import { AuthService } from 'src/app/Services/auth.service';
import { CartService } from 'src/app/Services/cart.service';
import { ProductsService } from 'src/app/Services/products.service';
import { UtilsService } from 'src/app/Services/utils.service';
import Swal from 'sweetalert2';

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
  public isDesktop: boolean;


  @ViewChild('menuCategories') menuCategories: MatSelectionList | undefined;

  constructor(
    private cartService: CartService,
    private productsService: ProductsService,
    public auth: AuthService,
    private utils: UtilsService,
    private router: Router) {
    this.isDesktop = this.utils.isDesktop;
  }

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
    const token = this.auth.token;
    if (token){
      this.cartService.addToCart({
      img: product.img,
      name: product.title,
      price: product.price,
      quantity: 1,
      id: product.id,
      _id: product._id,
    });
    }else {
      Swal.fire({
        title: "You need to login to purchase",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "Login",
        denyButtonText: `Cancel`
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.router.navigate(['/login']);

        } else if (result.isDenied) {
          Swal.fire("Not logged in", "", "info");
        }
      });
    }

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
