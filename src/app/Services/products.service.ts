import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from '../Models/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private baseUrl = 'http://localhost:4242';

  constructor(private _http: HttpClient) { }

  getItems(): Observable<IProduct[]> {
    //return this._http.get<IProduct[]>("../../assets/Datos/products.json");
    return this._http.get<IProduct[]>(this.baseUrl + "/api/products");

  }

  getSingle(){}

  addProduct(product: IProduct): Observable<IProduct> {

    return this._http.post<IProduct>(this.baseUrl + '/api/products', product);

  }

  updateProduct(productId: string){

    return this._http.put<IProduct>(this.baseUrl + '/api/products', productId);

  }

  deleteProduct(productId: string){
    return this._http.delete<IProduct>(this.baseUrl + '/api/products');
  }
}
