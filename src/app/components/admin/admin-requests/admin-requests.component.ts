import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order.service';
import { RequestsService } from 'src/app/services/requests.service';

@Component({
  selector: 'app-admin-requests',
  templateUrl: './admin-requests.component.html',
  styleUrls: ['./admin-requests.component.css']
})
export class AdminRequestsComponent implements OnInit{
  orderList: Order[] = []

  displayedColumns: string[] = ['id','orderId', 'date', 'orderDate', 'qtd', 'delete'];
  dataSource = this.orderList;

  constructor(private service: RequestsService,
              private router: Router,
              private toast: ToastrService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.service.findAll().subscribe((response: any) => {
      
      this.dataSource = response
      console.log(this.dataSource)
    })
  }

  delete(id: any){
    this.service.delete(id).subscribe(() => {
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate(['admin']));
      this.toast.info('Order deleted')
    })
  }

  getQtd(items: any){
    let qtd = 0;
    items.forEach(element => {
      qtd += element.quantity;
    });
    return qtd;
  }
}


