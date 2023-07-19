import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AddressEditComponent } from 'src/app/components/addresses/addresses-list/address-edit/address-edit.component';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  user: User = {
    id: null,
    email: '',
    password: '',
    customer: null
  }

  hide = true;
  password = new FormControl(null, Validators.minLength(3));
  
  constructor(private service: UserService,
              public dialogRef: MatDialogRef<AddressEditComponent>){ }

  ngOnInit(): void {
    this.service.findById(localStorage.getItem('userId')).subscribe((response: any) => {
      this.user = response
    })
  }

  update(){ 
    this.service.updateCustomer(this.user, this.user.id).subscribe(() => {
      this.dialogRef.close()
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  validateField(){
    return this.password.valid;
  }

}
