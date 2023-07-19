import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Credentials } from 'src/app/models/credentials';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-create',
  templateUrl: './admin-create.component.html',
  styleUrls: ['./admin-create.component.css']
})
export class AdminCreateComponent {

  creds: Credentials = {
    email: '',
    password: '',
  }

  hide = true;

  email = new FormControl(null, Validators.email);
  password = new FormControl(null, Validators.minLength(3));

  constructor(private service: UserService, private toast: ToastrService){ }

  validateField(): boolean {
    return this.email.valid && this.password.valid;
  }

  addAdmin(){
    this.service.insertAdmin(this.creds).subscribe(() => {
      this.toast.success('Admin created');
    })
  }
}
