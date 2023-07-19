import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AddressEditComponent } from 'src/app/components/addresses/addresses-list/address-edit/address-edit.component';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit{

customer: Customer = {
  customerName: '',
  documentNumber: null,
  customerStatus: '',
  customerType: '',
  creditScore: '',
  userId: null,
}

customerId = localStorage.getItem('customerId');

customerName = new FormControl(null, Validators.minLength(3));
  
  constructor(private service: CustomerService,
              public dialogRef: MatDialogRef<AddressEditComponent>){ }

  ngOnInit(): void {
    this.service.findById(this.customerId).subscribe((response: any) => {
      this.customer.customerName = response.customerName;
      this.customer.documentNumber = response.documentNumber;
      this.customer.customerStatus = response.customerStatus;
      this.customer.customerType = response.customerType;
      this.customer.creditScore = response.creditScore;
      this.customer.userId = parseInt(localStorage.getItem('userId'));
    })
  }

  update(){
    this.service.updateCustomer(this.customer, this.customerId).subscribe(() => {
      this.dialogRef.close()
    })
   }

  validateField(): boolean { 
    return this.customerName.valid;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  setCustomerType(customerType: string){
    this.customer.customerType = customerType;
  }

}
