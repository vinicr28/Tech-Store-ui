import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Address } from 'src/app/models/address';
import { AddressService } from 'src/app/services/address.service';

@Component({
  selector: 'app-addresses-create',
  templateUrl: './addresses-create.component.html',
  styleUrls: ['./addresses-create.component.css']
})
export class AddressesCreateComponent implements OnInit {
  address: Address = {
    id: null,
    street: '',
    houseNumber: null,
    neighborhood: '',
    zipCode: null,
    country: '',
    addressType: '',
    customerId: parseInt(localStorage.getItem('customerId')),
  }

  hideElement: boolean = false; 

  street = new FormControl(null, Validators.minLength(3));
  houseNumber = new FormControl(null, Validators.nullValidator);
  neighborhood = new FormControl(null, Validators.minLength(3));
  zipCode = new FormControl<number>(null, Validators.nullValidator);
  country = new FormControl(null, Validators.nullValidator);


  constructor(private service: AddressService,
              private router: Router) { }

  ngOnInit(){
    this.hideElement = this.service.hideElement;
  }

  validateField(): boolean {
    return this.street.valid && this.houseNumber.valid && this.neighborhood.valid 
    && this.zipCode.valid && this.country.valid;
  }

  insert(){
    this.service.insertAddress(this.address).subscribe((response: any) => {
      if(this.hideElement){
        this.router.navigate(['address'])
      } else {
        this.router.navigate(['home']);
      }
    })
   }

  setAddressType(addressType: string){
    this.address.addressType = addressType;
  }
}
