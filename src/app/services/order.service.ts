import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderDTO } from '../models/orderDTO';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  findAll(id: any) {
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
      `${API_CONFIG.baseUrl}/orders/user_id/${id}`,
      options,
    );
  }

  findById(id: any) {
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
      `${API_CONFIG.baseUrl}/orders/${id}`,
      options,
    );
  }

  insertOrder(orderDto: OrderDTO) {
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
      `${API_CONFIG.baseUrl}/orders`,
      orderDto,
      options,
    );
  }

  deleteOrder(id: any){
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
      `${API_CONFIG.baseUrl}/orders/${id}`,
      options,
    );
  }

  countOrdersToday(){
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
      `${API_CONFIG.baseUrl}/orders/count`,
      options,
    );
  }

  invoice(){
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
      `${API_CONFIG.baseUrl}/orders/invoicing`,
      options,
    );
  }

  reportOrderWeek() {
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
      `${API_CONFIG.baseUrl}/orders/report`,
      options,
    );
  }
}
