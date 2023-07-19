import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit{

  constructor(private authService: AuthService, 
              private router: Router){ }

  ngOnInit(): void {
    if(!this.authService.getRole()){
      this.router.navigate(['home'])
    }
  }
}
