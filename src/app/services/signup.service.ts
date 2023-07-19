import { HttpClient} from '@angular/common/http';
import { Injectable, numberAttribute } from '@angular/core';
import { Credentials } from '../models/credentials';
import { API_CONFIG } from '../config/api.config';
import { User } from '../models/user'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  token: string;

  constructor(private http: HttpClient) { }

  insertUser(creds: Credentials): Observable<User>{
    return this.http.post<User>(
      `${API_CONFIG.baseUrl}/users/signup`,
      creds
    );
  }

  successfulSignup(id: any){
    localStorage.setItem('userId', id);
  }
}
