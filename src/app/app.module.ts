import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule, routes } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

//work with forms on angular
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

// To do request with HTTP
import { HttpClientModule } from "@angular/common/http";

// Imports for components Angular Material
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatButtonModule } from "@angular/material/button";
import { MatSelectModule } from "@angular/material/select";
import { MatTableModule } from "@angular/material/table";
import { MatRadioModule } from "@angular/material/radio";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatCardModule } from "@angular/material/card";
import {MatDialogModule} from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatBadgeModule} from '@angular/material/badge';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { HighchartsChartModule } from 'highcharts-angular';
import { ChartModule } from 'angular-highcharts';

//Components
import { NavComponent } from "./components/nav/nav.component";
import { HomeComponent } from './components/home/home.component';
import { ProductListComponent } from './components/productOffering/product-list/product-list.component';
import { LoginComponent } from './components/login/login.component';
import { ToastrModule } from "ngx-toastr";
import { AuthGuard } from "./auth/auth.guard";
import { SingupComponent } from './components/signup/signup.component';
import { provideEnvironmentNgxMask } from "ngx-mask";
import { AddressesCreateComponent } from './components/addresses/addresses-create/addresses-create.component';
import { AddressesListComponent } from './components/addresses/addresses-list/addresses-list.component';
import { AddressEditComponent } from './components/addresses/addresses-list/address-edit/address-edit.component';
import { AccountComponent } from './components/account/account.component';
import { AccountUserComponent } from './components/account/account-user/account-user.component';
import { AccountCustomerComponent } from './components/account/account-customer/account-customer.component';
import { CustomerEditComponent } from './components/account/account-customer/customer-edit/customer-edit.component';
import { AccountScoreComponent } from './components/account/account-score/account-score.component';
import { UserEditComponent } from './components/account/account-user/user-edit/user-edit.component';
import { OrderComponent } from './components/order/order.component';
import { OrderCreateComponent } from './components/order/order-create/order-create.component';
import { OrderSidenavComponent } from './components/order/order-sidenav/order-sidenav.component';
import { DeliveryAddressComponent } from './components/order/order-sidenav/delivery-address/delivery-address.component';
import { OrderListComponent } from './components/order/order-list/order-list.component';
import { OrderIdComponent } from './components/order/order-list/order-id/order-id.component';
import { ProductCreateComponent } from './components/productOffering/product-list/product-create/product-create.component';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { ProductEditComponent } from './components/productOffering/product-list/product-edit/product-edit.component';
import { AdminComponent } from './components/admin/admin.component';
import { AdminCardsComponent } from './components/admin/admin-cards/admin-cards.component';
import { AdminChartComponent } from './components/admin/admin-chart/admin-chart.component';
import { AdminCreateComponent } from './components/admin/admin-create/admin-create.component';
import { AdminRequestsComponent } from './components/admin/admin-requests/admin-requests.component';

@NgModule({
  declarations: [AppComponent, NavComponent, HomeComponent, ProductListComponent, LoginComponent, SingupComponent, AddressesCreateComponent,
     AddressesListComponent, AddressEditComponent, AccountComponent, AccountUserComponent, AccountCustomerComponent, CustomerEditComponent, 
     AccountScoreComponent, UserEditComponent, OrderComponent, OrderCreateComponent, OrderSidenavComponent, DeliveryAddressComponent, OrderListComponent, 
     OrderIdComponent, ProductCreateComponent, ProductEditComponent, AdminComponent, AdminCardsComponent, AdminChartComponent, AdminCreateComponent, AdminRequestsComponent,],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxMaskDirective, 
    NgxMaskPipe,
    // Forms
    FormsModule,
    ReactiveFormsModule,
    // Request http
    HttpClientModule,
    // Angular Material
    MatFormFieldModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatRadioModule,
    MatTableModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatBadgeModule,
    MatProgressSpinnerModule,
    HighchartsChartModule,
    ChartModule,
    ToastrModule.forRoot({
      timeOut: 4000,
      closeButton: true,
      progressBar: true
    }),
  ],
  providers: [AuthGuard, provideEnvironmentNgxMask()],
  bootstrap: [AppComponent],
})
export class AppModule {}


