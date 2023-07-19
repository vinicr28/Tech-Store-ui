import { Component, DoCheck, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OrderDTO } from 'src/app/models/orderDTO';
import { OrderItemDTO } from 'src/app/models/orderItemDTO';
import { ProductOffering } from 'src/app/models/productOffering';
import { ProductOfferingService } from 'src/app/services/product-offering.service';
import { OrderCreateComponent } from '../order-create/order-create.component';
import { DeliveryAddressComponent } from './delivery-address/delivery-address.component';
import { OrderService } from 'src/app/services/order.service';
import { timeout } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { CustomerService } from 'src/app/services/customer.service';
import { Customer } from 'src/app/models/customer';

@Component({
  selector: 'app-order-sidenav',
  templateUrl: './order-sidenav.component.html',
  styleUrls: ['./order-sidenav.component.css'],
})
export class OrderSidenavComponent implements OnInit{

  productArr: OrderItemDTO[] = [];

  helperArr: {productName: string, quantity: any, unitPrice: any}[] = [];

  showSpinner = false;
  
  checkoutdisable = true;

  order: OrderDTO = {
    customerId: parseInt(localStorage.getItem('customerId')),
    addressId: null,
    orderItem: this.productArr,
    discount: 0.0
  }

  customer: Customer = {
    customerName: '',
    documentNumber: null,
    customerStatus: '',
    customerType: '',
    creditScore: '',
    userId: null,
  }

  constructor(private productService: ProductOfferingService, 
              private service: OrderService, 
              private customerService: CustomerService,
              public dialog: MatDialog){ }

  ngOnInit(): void {
    this.productArr = JSON.parse(localStorage.getItem('productArr'));
    this.productArr.forEach(element => {
      this.productService.findById(element.id).subscribe((response: any)=> {
        this.helperArr.push({productName: response.productName, quantity: element.quantity, unitPrice: response.unitPrice});
      })
    });
  }

  insertOrder(){
    this.order.orderItem = this.productArr;
    this.service.insertOrder(this.order).subscribe((result: any) => {
      localStorage.removeItem('productArr');
      if(parseFloat(this.estimateTotal()) >= 500){
        this.customerService.findById(localStorage.getItem('customerId')).subscribe((response: any) => {
          this.customer.customerName = response.customerName;
          this.customer.documentNumber = response.documentNumber;
          this.customer.customerStatus = response.customerStatus;
          this.customer.customerType = response.customerType;
          this.customer.creditScore = response.creditScore;
          if(parseInt(this.customer.creditScore) < 100){
            let score = parseInt(this.customer.creditScore) + 10;
            this.customer.creditScore = score.toString();
            this.customerService.updateCustomer(this.customer, localStorage.getItem('customerId')).subscribe(() =>{
            console.log(this.customer.creditScore);
          })
          }
          
          
        })
      }
      this.productArr = [];
      this.helperArr = [];
      this.showSpinner = true;
      setTimeout(() => {
        this.showSpinner = false;
      }, 2000)
    })
  }

  removeItem(product: any){
    let index = this.helperArr.indexOf(product);
    this.helperArr.splice(index, 1)
    this.productArr.splice(index, 1)
    localStorage.setItem('productArr', JSON.stringify(this.productArr))
  }

  estimateTotal(){
    let total = 0;
    this.helperArr.forEach(element => {
      total += (element.unitPrice * element.quantity);
    });
    return total.toFixed(2);
  }


  openDialog(id: any): void {
    const dialogRef = this.dialog.open(DeliveryAddressComponent);

    dialogRef.afterClosed().subscribe((result: any) => {
      this.dialog.closeAll;
      console.log('The dialog was closed');
      
      let addressId = result.data;
      
      if(addressId != null){
        this.checkoutdisable = false
        this.order.addressId = addressId;
      }
    });
  }
}

  


