import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AddressEditComponent } from 'src/app/components/addresses/addresses-list/address-edit/address-edit.component';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-id',
  templateUrl: './order-id.component.html',
  styleUrls: ['./order-id.component.css']
})
export class OrderIdComponent implements OnInit{

  order: Order = {
    id: null,
    instant: '',
    deliveryAddress: null,
    items: []
  }

  constructor(private service: OrderService,
              public dialogRef: MatDialogRef<OrderIdComponent>,
              @Inject(MAT_DIALOG_DATA) public orderId: any){ }
  
  ngOnInit(): void {
    this.service.findById(this.orderId.id).subscribe((response: any) => {
        this.order = response;
        console.log(this.order.items)
    })
  }

  delete(){
    this.service.deleteOrder(this.order.id).subscribe(() => {
      this.dialogRef.close({data:  true});
    })
  }

  totalPrice(){
    let total = 0;
    this.order.items.forEach(element => {
      total += element.totalPrice
    });
    return total.toFixed(2);
  }

  totalDiscount(){
    let total = 0;
    this.order.items.forEach(element => {
      total += element.discount
    });
    return total.toFixed(2);
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

}
