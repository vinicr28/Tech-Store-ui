import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Credentials } from '../models/credentials';
import { API_CONFIG } from '../config/api.config';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  token: string;

  constructor(private http: HttpClient) { }

  findByEmail(creds: Credentials): Observable<User>{
    let options = {
      headers: new HttpHeaders().set(
        "Content-Type",
        "application/json"
      ).set(
        'Authorization',
        `Bearer ${localStorage.getItem("token")}`
      )
    };


    return this.http.get<User>(
      `${API_CONFIG.baseUrl}/users/login/${creds.email}`,
      options
    );
  }

  validEmail(id: any){
    localStorage.setItem('userId', id);
  }

  saveCustomerId(customerId: any){
    localStorage.setItem('customerId', customerId);
  }
}
