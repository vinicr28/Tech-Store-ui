import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../config/api.config';
import { Observable } from 'rxjs';
import { ProductOffering } from '../models/productOffering';

@Injectable({
  providedIn: 'root'
})
export class ProductOfferingService {

  constructor(private http: HttpClient) { }

  findAll(page: number): Observable<ProductOffering[]>{
    return this.http.get<ProductOffering[]>(`${API_CONFIG.baseUrl}/productOfferings/page/${page}`);
  }

  findById(id: any): Observable<ProductOffering>{
    let options = {
      headers: new HttpHeaders().set(
        "Content-Type",
        "application/json"
      ).set(
        'Authorization',
        `Bearer ${localStorage.getItem("token")}`
      )
    };

    return this.http.get<ProductOffering>(`http://localhost:8080/productOfferings/${id}`, options)
  }

  insertProduct(product: ProductOffering) {
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
      `${API_CONFIG.baseUrl}/productOfferings`,
      product,
      options,
    );
  }

  updateProduct(product: ProductOffering, id: any){
    let options = {
      headers: new HttpHeaders().set(
        "Content-Type",
        "application/json"
      ).set(
        'Authorization',
        `Bearer ${localStorage.getItem("token")}`
      )
    };

    return this.http.patch(`http://localhost:8080/productOfferings/${id}`, 
    product,
    options,
    );
  }

  deleteProduct(id: any){
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
      `http://localhost:8080/productOfferings/${id}`,
      options,
    );
  }

  totalOfProducts(){
    let options = {
      headers: new HttpHeaders().set(
        "Content-Type",
        "application/json"
      ).set(
        'Authorization',
        `Bearer ${localStorage.getItem("token")}`
      )
    };

    return this.http.get(
      `${API_CONFIG.baseUrl}/productOfferings/total`,
      options,
    );
  }
}
