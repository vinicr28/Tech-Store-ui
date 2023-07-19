import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Customer } from '../models/customer';
import { API_CONFIG } from '../config/api.config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) {}

  findById(id: any): Observable<Customer>{
    let options = {
      headers: new HttpHeaders().set(
        "Content-Type",
        "application/json"
      ).set(
        'Authorization',
        `Bearer ${localStorage.getItem("token")}`
      )
    };

    return this.http.get<Customer>(`http://localhost:8080/customers/${id}`, options)
  }

  insertCustomer(customer: Customer) {
    let options = {
      headers: new HttpHeaders().set(
        "Content-Type",
        "application/json"
      ).set(
        'Authorization',
        `Bearer ${localStorage.getItem("token")}`
      )
    };

    return this.http.post(
      `${API_CONFIG.baseUrl}/customers`,
      customer,
      options,
    );
  }

  updateCustomer(customer: Customer, id: any){
    let options = {
      headers: new HttpHeaders().set(
        "Content-Type",
        "application/json"
      ).set(
        'Authorization',
        `Bearer ${localStorage.getItem("token")}`
      )
    };

    return this.http.patch(`http://localhost:8080/customers/${id}`, customer,
    options,
    );
  }

  successfulSignup(id: any){
    localStorage.setItem('customerId', id);
  }
}
