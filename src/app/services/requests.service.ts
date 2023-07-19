import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  constructor(private http: HttpClient) { }

  findAll() {
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
      `${API_CONFIG.baseUrl}/requests/page/0`,
      options,
    );
  }

  delete(id: any) {
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
      `${API_CONFIG.baseUrl}/requests/request_id/${id}`,
      options,
    );
  }
}
