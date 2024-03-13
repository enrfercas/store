import { Component } from '@angular/core';
import { IOrder } from 'src/app/Models/order';
import { OrdersService } from 'src/app/Services/orders.service';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css']
})
export class OrdersListComponent {
  public ordersList: IOrder[] = [];

  constructor(private orderService: OrdersService){
    const response = this.orderService.getOrders().subscribe((response)=>{
      console.log(response);
      this.ordersList = response;
    });
  }

}
