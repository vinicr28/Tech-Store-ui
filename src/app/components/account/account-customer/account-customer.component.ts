import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';
import { CustomerEditComponent } from './customer-edit/customer-edit.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-customer',
  templateUrl: './account-customer.component.html',
  styleUrls: ['./account-customer.component.css']
})
export class AccountCustomerComponent implements OnInit{
  customer: Customer = {
      customerName: '',
      documentNumber: null,
      customerStatus: '',
      customerType: '',
      creditScore: '',
      userId: null,
  }

  customerId = localStorage.getItem('customerId');
 
 constructor(private service: CustomerService,
             private router: Router,
             public dialog: MatDialog){ }

  ngOnInit(): void {
    this.service.findById(this.customerId).subscribe((response: any) => {
      this.customer = response;
    })
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(CustomerEditComponent);

    dialogRef.afterClosed().subscribe(() => {
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate(['account']));
      console.log('The dialog was closed');
    });
  }

}
