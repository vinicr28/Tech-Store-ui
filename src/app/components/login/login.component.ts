import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Credentials } from 'src/app/models/credentials';
import { AuthService } from 'src/app/services/auth.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  
  creds: Credentials = {
    email: '',
    password: '',
  }

  hide = true;

  email = new FormControl(null, Validators.email);
  password = new FormControl(null, Validators.minLength(3));

  constructor( 
    private loginService: LoginService, 
   private toast: ToastrService,
    private service: AuthService,
    private router: Router) { }

  ngOnInit() {
  }

  validateField(): boolean {
    return this.email.valid && this.password.valid;
  }

  singIn() {
      this.service.authenticate(this.creds).subscribe((response: any) =>{
        this.service.successfulLogin(response.access_token);
        this.loginService.findByEmail(this.creds).subscribe((response: any) => {
          this.loginService.validEmail(response.id);
          console.log(response)
          if(response.customerId != null){
            this.loginService.saveCustomerId(response.customerId);
          }
          this.router.navigate(['home']);
        })
      }, () =>  {
        this.toast.error('Invalid login information');
      }) 
  
    
  }
}
