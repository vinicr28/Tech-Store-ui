import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AddressEditComponent } from 'src/app/components/addresses/addresses-list/address-edit/address-edit.component';
import { Address } from 'src/app/models/address';
import { AddressService } from 'src/app/services/address.service';

@Component({
  selector: 'app-delivery-address',
  templateUrl: './delivery-address.component.html',
  styleUrls: ['./delivery-address.component.css']
})
export class DeliveryAddressComponent implements OnInit{
  
  addressesList: Address[]= []

  selectedAddress: Address;

  constructor(private addressService: AddressService, public dialogRef: MatDialogRef<AddressEditComponent>) { }
  
  ngOnInit(): void {
    this.addressService.findAll(localStorage.getItem('customerId')).subscribe((response: any) => {
      response.forEach(element => {
        this.addressesList.push(element)
      });
    })
  }

  selectAddress(address: Address){
    this.selectedAddress = address;
  }

  onNoClick(): void {
    this.dialogRef.close({data: this.selectedAddress.id});
  }

}
