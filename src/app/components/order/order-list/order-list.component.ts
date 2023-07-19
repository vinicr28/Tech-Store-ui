import { Component, OnInit } from '@angular/core';
import { Address } from 'src/app/models/address';
import { Order } from 'src/app/models/order';
import { OrderItem } from 'src/app/models/orderItem';
import { OrderService } from 'src/app/services/order.service';
import { OrderIdComponent } from './order-id/order-id.component';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  orderList: Order[] = []

  hide: boolean;

  displayedColumns: string[] = ['id', 'date', 'address', 'qtd', 'details'];
  dataSource = this.orderList;

  constructor(private service: OrderService,
              private router: Router,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.service.findAll(localStorage.getItem('userId')).subscribe((response: any) => {
      
      this.orderList = response.sort((a, b) => b.id - a.id)
      this.dataSource = this.orderList;
    })
  }

  getQtd(items: any){
    let qtd = 0;
    items.forEach(element => {
      qtd += element.quantity;
    });
    return qtd;
  }

  openDialog(id: any): void {
    const dialogRef = this.dialog.open(OrderIdComponent, {
      data: {id: id}});

    dialogRef.afterClosed().subscribe((response: any) => {
      console.log('The dialog was closed');
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate(['orders']));
      this.hide = response.data
    });
  }
}
