import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Credentials } from 'src/app/models/credentials';
import { Customer } from 'src/app/models/customer';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerService } from 'src/app/services/customer.service';
import { SignupService } from 'src/app/services/signup.service';

@Component({
  selector: 'app-singup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SingupComponent implements OnInit{
  creds: Credentials = {
    email: '',
    password: '',
  }

  customer: Customer = {
    customerName: '',
    documentNumber: null,
    customerStatus: 'active',
    customerType: '',
    creditScore: '0',
    userId: 0,
  }

  showSpinner = false;

  hide = true;

  email = new FormControl(null, Validators.email);
  password = new FormControl(null, Validators.minLength(3));
  customerName = new FormControl(null, Validators.minLength(3));
  documentNumber = new FormControl<number>(null, [Validators.minLength(11), Validators.maxLength(11)]);
  customerType = new FormControl(null, Validators.nullValidator);



  constructor(private service: SignupService,
              private authService: AuthService, 
              private customerService: CustomerService,
              private toast: ToastrService,
              private router: Router) { }

  ngOnInit(): void {
  }

  validateField(): boolean {
    return this.email.valid && this.password.valid && this.customerName.valid 
    && this.documentNumber.valid && this.customerType.valid;
  }

  signup() {
    this.showSpinner = true;
    this.service.insertUser(this.creds).subscribe((response: any) => {
      this.service.successfulSignup(response.id);
      this.customer.userId = parseInt(localStorage.getItem('userId'));
      
      this.authService.authenticate(this.creds).subscribe((response: any) => {
        this.authService.successfulLogin(response.access_token);

        this.customerService.insertCustomer(this.customer).subscribe((response: any) => {
          this.customerService.successfulSignup(response.id);
          this.toast.info('Account Created');
          this.showSpinner = false;
          this.router.navigate(['signup/address']);
        })
      });
    })
  }

  setCustomerType(customerType: string){
    this.customer.customerType = customerType;
  }
}
