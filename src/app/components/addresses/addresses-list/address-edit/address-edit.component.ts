import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Address } from 'src/app/models/address';
import { AddressService } from 'src/app/services/address.service';

@Component({
  selector: 'app-address-edit',
  templateUrl: './address-edit.component.html',
  styleUrls: ['./address-edit.component.css']
})
export class AddressEditComponent implements OnInit {

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

  constructor(
    public dialogRef: MatDialogRef<AddressEditComponent>,
    private service: AddressService
  ) { }

  ngOnInit(): void {
    this.service.findById(sessionStorage.getItem('addressId')).subscribe((response: any) => {
      this.address = response;
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  street = new FormControl(null, Validators.minLength(3));
  houseNumber = new FormControl(null, Validators.nullValidator);
  neighborhood = new FormControl(null, Validators.minLength(3));
  zipCode = new FormControl<number>(null, Validators.nullValidator);
  country = new FormControl(null, Validators.nullValidator);

  setAddressType(addressType: string){
    this.address.addressType = addressType;
  }
  
  validateField(): boolean {
    return this.street.valid && this.houseNumber.valid && this.neighborhood.valid 
    && this.zipCode.valid && this.country.valid;
  }

  update(){
    this.service.updateAddress(this.address, localStorage.getItem('customerId')).subscribe(() => {
      this.dialogRef.close()
    })
  }
}
