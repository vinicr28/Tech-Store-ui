import { Component, OnInit} from '@angular/core';
import { ProductOffering } from 'src/app/models/productOffering';
import { ProductOfferingService } from 'src/app/services/product-offering.service';
import { AddressEditComponent } from '../../addresses/addresses-list/address-edit/address-edit.component';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { OrderSidenavComponent } from '../order-sidenav/order-sidenav.component';

@Component({
  selector: 'app-order-create',
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.css']
})
export class OrderCreateComponent implements OnInit{
  
  product: ProductOffering = {
    id: null,
    productName: '',
    unitPrice: 0,
    state: '',
    sellIndicator: null
  }

  productQtd = 1;

  productArr: {id: any, quantity: any}[] = []

  constructor(private productService: ProductOfferingService,
              private router: Router, 
              public dialogRef: MatDialogRef<OrderCreateComponent>){}
  
  ngOnInit(): void {
    this.productService.findById(sessionStorage.getItem('productId')).subscribe((response: any) => {
      this.product = response
    })
  }

  addToCart(){

    if(localStorage.getItem('productArr')){
      this.productArr = JSON.parse(localStorage.getItem('productArr'))
    }

    this.productArr.push({id: this.product.id, quantity: this.productQtd})
    localStorage.setItem('productArr', JSON.stringify(this.productArr))
    this.dialogRef.close()
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addQtd(){
    this.productQtd++

    if(this.productQtd >= 20){
      this.productQtd = 20
    }
  }

  removeQtd(){
    this.productQtd--

    if(this.productQtd <= 1){
      this.productQtd = 1
    }
  }
}
