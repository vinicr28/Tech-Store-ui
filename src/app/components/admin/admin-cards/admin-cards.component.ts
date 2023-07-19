import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { ProductOfferingService } from 'src/app/services/product-offering.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-cards',
  templateUrl: './admin-cards.component.html',
  styleUrls: ['./admin-cards.component.css']
})
export class AdminCardsComponent implements OnInit{

  ordersOfToday: number;
  totalOfUsers: number;
  totalOfProducts: number;
  invoice: number;

  constructor(private orderService: OrderService,
              private userService: UserService,
              private productService: ProductOfferingService,
              ){ }

  ngOnInit(): void {
    this.orderService.countOrdersToday().subscribe((response: any) => {
      this.ordersOfToday = response;
      this.userService.totalOfUsers().subscribe((response: any) => {
        this.totalOfUsers = response;
        this.orderService.invoice().subscribe((response: any) => {
          this.invoice = response;
          this.productService.totalOfProducts().subscribe((response: any) => {
            this.totalOfProducts = response;
          })
        })
      })
    })
  }
}
