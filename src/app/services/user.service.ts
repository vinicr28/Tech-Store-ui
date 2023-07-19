import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { API_CONFIG } from '../config/api.config';
import { Credentials } from '../models/credentials';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  
  findById(id: any): Observable<User>{
    let options = {
      headers: new HttpHeaders().set(
        "Content-Type",
        "application/json"
      ).set(
        'Authorization',
        `Bearer ${localStorage.getItem("token")}`
      )
    };

    return this.http.get<User>(`http://localhost:8080/users/${id}`, options)
  }


  updateCustomer(user: User, id: any){
    let options = {
      headers: new HttpHeaders().set(
        "Content-Type",
        "application/json"
      ).set(
        'Authorization',
        `Bearer ${localStorage.getItem("token")}`
      )
    };

    return this.http.patch(`http://localhost:8080/users/${id}`, user,
    options,
    );
  }

  totalOfUsers(){
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
      `${API_CONFIG.baseUrl}/users/total`,
      options,
    );
  }

  insertAdmin(creds: Credentials){
    let options = {
      headers: new HttpHeaders().set(
        "Content-Type",
        "application/json"
      ).set(
        'Authorization',
        `Bearer ${localStorage.getItem("token")}`
      )
    };

    return this.http.post<User>(
      `${API_CONFIG.baseUrl}/users`,
      creds,
      options
    );
  }

}
