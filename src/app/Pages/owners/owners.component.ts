import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatListOption, MatSelectionList } from '@angular/material/list';
import { IProduct } from 'src/app/Models/product';
import { CartService } from 'src/app/Services/cart.service';

@Component({
  selector: 'app-owners',
  templateUrl: './owners.component.html',
  styleUrls: ['./owners.component.css']
})
export class OwnersComponent {
  public searchKey: string = 'Search a product';
  public categories: string[] = [];
  public products: IProduct[] = [];
  public dataSource: IProduct[] = [];
  public form: FormGroup;


  @ViewChild('menuCategories') menuCategories: MatSelectionList | undefined;

  constructor(private cartService: CartService, private fb: FormBuilder) {

    this.form = fb.group({
      registerName: ["", [Validators.required, Validators.minLength(4)]],
      registerUsername: ["", [Validators.required, Validators.minLength(4)]],
      registerEmail: ["", [Validators.required, Validators.email]],
      registerPassword: ["", [Validators.required, Validators.minLength(4)]],
      registerRepeatPassword: ["", [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.cartService.getItems().subscribe((data) => {
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

  addProduct(){

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
