import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatListOption, MatSelectionList } from '@angular/material/list';
import { IProduct } from 'src/app/Models/product';
import { CartService } from 'src/app/Services/cart.service';
import { ProductsService } from 'src/app/Services/products.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-owners',
  templateUrl: './owners.component.html',
  styleUrls: ['./owners.component.css'],
})
export class OwnersComponent {
  public searchKey: string = 'Search a product';
  public categories: string[] = [];
  public products: IProduct[] = [];
  public dataSource: IProduct[] = [];
  public formAdd: FormGroup;
  public formEdit: FormGroup;

  @ViewChild('menuCategories') menuCategories: MatSelectionList | undefined;

  constructor(
    private cartService: CartService,
    private fb: FormBuilder,
    private productsService: ProductsService
  ) {
    this.formAdd = fb.group({
      price: ['', [Validators.required, Validators.minLength(4)]],
      category: ['', [Validators.required, Validators.minLength(4)]],
      id: ['', [Validators.required]],
      title: ['', [Validators.required, Validators.minLength(4)]],
      img: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });

    this.formEdit = fb.group({
      price: ['', [Validators.required, Validators.minLength(4)]],
      category: ['', [Validators.required, Validators.minLength(4)]],
      id: ['', [Validators.required, Validators.email]],
      title: ['', [Validators.required, Validators.minLength(4)]],
      img: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
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
        let fiteredProducts: IProduct[][] = filterCategories.map((category) => {
          let subFiltered = this.products.filter((product) => {
            return product.category === category;
          });
          return subFiltered;
        });
        this.dataSource = fiteredProducts.flat(1);
      }
    }
  }

  onSearch() {
    const _searchKey = this.searchKey.toLowerCase();
    if (_searchKey !== 'Search a product') {
      let fiteredProducts: IProduct[] = this.dataSource.filter((product) => {
        return product.title.toLowerCase().includes(_searchKey);
      });
      this.dataSource = fiteredProducts;
    }
    if (_searchKey === '') {
      this.onFilter();
    }
  }

  onSort(sort: string) {
    if (sort === 'asc') {
      this.dataSource.sort((a, b) => a.price - b.price);
    } else {
      this.dataSource.sort((a, b) => b.price - a.price);
    }
  }

  addProduct(product: IProduct) {

    Swal.fire({
      title: 'Do you want to add a new product?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then((result) => {

      if (result.isConfirmed) {
        const newProduct = this.productsService.addProduct(product).subscribe((data)=>{
          console.log("data: ",data);
        })
        console.log("newProduct: ",newProduct);
        Swal.fire('Saved!', '', 'success');

      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info');
      }
    });

  }

  updateProduct(product: IProduct) {}

  editProduct(product: IProduct) {
    this.formEdit = this.fb.group({
      price: [product.price, [Validators.required, Validators.minLength(4)]],
      category: [
        product.category,
        [Validators.required, Validators.minLength(4)],
      ],
      id: [product.id, [Validators.required, Validators.email]],
      title: [product.title, [Validators.required, Validators.minLength(4)]],
      img: [product.img, [Validators.required]],
      description: [product.description, [Validators.required]],
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
