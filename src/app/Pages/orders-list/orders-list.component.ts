import { Component, OnInit } from '@angular/core';
import { IOrder } from 'src/app/Models/order';
import { IProduct } from 'src/app/Models/product';
import { OrdersService } from 'src/app/Services/orders.service';
import { ProductsService } from 'src/app/Services/products.service';
import { UtilsService } from 'src/app/Services/utils.service';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css'],
})
export class OrdersListComponent implements OnInit {
  private products: any;
  public dataSource: any;
  public isDesktop: boolean = false;
  public ordersList: any;
  public displayedColumns: string[] = [
    'product',
    'name',
    'quantity',
    'username',
    'total',
  ];

  constructor(
    private orderService: OrdersService,
    private productsService: ProductsService,
    private utils: UtilsService
  ) {
    this.isDesktop = this.utils.isDesktop;
    if (!this.isDesktop) {
      this.displayedColumns.shift();
    }
  }

  ngOnInit(): void {
    const response = this.orderService.getOrders().subscribe((response) => {
      console.log("La response es: ",response);
      this.ordersList = response;
      let reOrders = this.ordersList;
    if (this.ordersList) {
      reOrders = this.ordersList.map((item: any) => {
        const order: any = item.suborders?.map((suborder: any) => {
          return {
            userId: item.userId,
            productId: suborder.productId,
            quantity: suborder.quantity,
            subtotal: suborder.subtotal,
            total: item.total,
          };
        });
        return order;
      });
      console.log(reOrders);
      reOrders = reOrders.flat(1);
      console.log("Las reOrders: ",reOrders);
      this.productsService.getItems().subscribe((data) => {
        this.products = data;
        console.log("Antes del reOrders", this.products);
        if (reOrders) {
          this.products = reOrders.map((data: any) => {
            return this.products.find((item: any) => data.productId == item._id);
          });
        }
        this.dataSource = reOrders.map((data: any, index: number) => {

          return {
            userId: data.userId,
            img: this.products[index].img,
            name: this.products[index].title,
            quantity: data.quantity,
            subtotal: data.subtotal,
            total: data.total,
          };
        });

      });

    }


    console.log('products: ', this.products);


    console.log(this.dataSource);
    });

  }
}
