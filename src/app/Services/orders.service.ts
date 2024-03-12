import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IOrder } from '../Models/order';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private baseUrl = 'http://localhost:4242/api/orders/';

  constructor(private http: HttpClient) { }

  addOrder(newOrder: IOrder): Observable<IOrder> {

    return this.http.post<IOrder>(this.baseUrl, newOrder);
  }
}
