import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NavComponent } from "./components/nav/nav.component";
import { HomeComponent } from "./components/home/home.component";
import { ProductListComponent } from "./components/productOffering/product-list/product-list.component";
import { LoginComponent } from "./components/login/login.component";
import { AuthGuard } from "./auth/auth.guard";
import { SingupComponent } from "./components/signup/signup.component";
import { AddressesCreateComponent } from "./components/addresses/addresses-create/addresses-create.component";
import { AddressesListComponent } from "./components/addresses/addresses-list/addresses-list.component";
import { AccountComponent } from "./components/account/account.component";
import { OrderSidenavComponent } from "./components/order/order-sidenav/order-sidenav.component";
import { OrderComponent } from "./components/order/order.component";
import { AdminComponent } from "./components/admin/admin.component";

export const routes: Routes = [
  {path: 'signup', component: SingupComponent},
  {path: 'signup/address', component: AddressesCreateComponent},
  {path: "login", component: LoginComponent},
  {
    path: "", component: NavComponent, canActivate: [AuthGuard], children: [
      {
        path: 'home', component: HomeComponent
      },
      {
        path: 'products', component: ProductListComponent
      },
      {
        path: 'address', component: AddressesListComponent
      },
      {
        path: 'address/create', component: AddressesCreateComponent
      },
      {
        path: 'account', component: AccountComponent
      },
      {
        path:'cart', component: OrderSidenavComponent, outlet: 'sidenav'
      },
      {
        path: 'orders', component: OrderComponent
      },
      {
        path: 'admin', component: AdminComponent
      }
      
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
