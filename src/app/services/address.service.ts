import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Address } from '../models/address';
import { API_CONFIG } from '../config/api.config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  hideElement: boolean = false;
  
  constructor(private http: HttpClient) { }

  findAll(id: any): Observable<Address[]>{
    let options = {
      headers: new HttpHeaders().set(
        "Content-Type",
        "application/json"
      ).set(
        'Authorization',
        `Bearer ${localStorage.getItem("token")}`
      )
    };

    return this.http.get<Address[]>(`http://localhost:8080/customers/${id}/addresses`, options);
  }

  findById(id: any): Observable<Address>{
    let options = {
      headers: new HttpHeaders().set(
        "Content-Type",
        "application/json"
      ).set(
        'Authorization',
        `Bearer ${localStorage.getItem("token")}`
      )
    };

    return this.http.get<Address>(`http://localhost:8080/customers/addresses/id/${id}`, options)
  }
  
  insertAddress(address: Address) {
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
      `${API_CONFIG.baseUrl}/customers/addresses`,
      address,
      options,
    );
  }

  updateAddress(address: Address, customerId: any){
    let options = {
      headers: new HttpHeaders().set(
        "Content-Type",
        "application/json"
      ).set(
        'Authorization',
        `Bearer ${localStorage.getItem("token")}`
      )
    };

    return this.http.patch(`http://localhost:8080/customers/${customerId}/addresses/id/${address.id}`, address,
    options,
    );
  }

  deleteAddress(id: any){
    let options = {
      headers: new HttpHeaders().set(
        "Content-Type",
        "application/json"
      ).set(
        'Authorization',
        `Bearer ${localStorage.getItem("token")}`
      )
    };

    return this.http.delete(
      `http://localhost:8080/customers/addresses/id/${id}`,
      options,
    );

  }
}
