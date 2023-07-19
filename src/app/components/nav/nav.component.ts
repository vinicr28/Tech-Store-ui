import { Component, OnInit} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "src/app/services/auth.service";
import { OrderSidenavComponent } from "../order/order-sidenav/order-sidenav.component";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.css"],
})
export class NavComponent implements OnInit {
  container: any;

  role: boolean;

  constructor(private router: Router, private authService: AuthService, private toast: ToastrService) {}

  ngOnInit(): void {
    this.router.navigate(['home']);
    this.notification();
    this.role = this.authService.getRole();
  }

  logout(){ 
    this.authService.logout();
    this.toast.info('Successful logout!', 'Logout', {timeOut: 7000})
    this.router.navigateByUrl('login')
  }

  notification(): any {
    let productArr: {productId: any, quantity: any}[] = JSON.parse(localStorage.getItem('productArr'));
    if(productArr != null){
      return productArr.length
    }else{
      return 0;
    }
  }
}



  