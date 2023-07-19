import { Injectable } from "@angular/core";
import { Credentials } from "../models/credentials";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { API_CONFIG } from "../config/api.config";
import { Observable } from "rxjs";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: "root",
})
export class AuthService {

  jwtService: JwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient) {}

  authenticate(creds: Credentials) {
    let options = {
      headers: new HttpHeaders().set(
        "Content-Type",
        "application/x-www-form-urlencoded"
      ).set(
        'Authorization',
        'Basic cmFtcFVwOjEyMw=='
      )
    };

    let params = new HttpParams()
      .set("username", creds.email)
      .set("password", creds.password)
      .set("grant_type", "password");

    return this.http.post(
      `${API_CONFIG.baseUrl}/oauth/token`,
      params,
      options,
    );
    
  }

  successfulLogin(authToken: string){
    localStorage.setItem('token', authToken);
  }

  isAuthenticated() {
    let token = localStorage.getItem('token')
    if (token != null){
      return !this.jwtService.isTokenExpired(token)
    }
    return false;
  }

  logout(){
    localStorage.clear();
  }

  getRole(): boolean{
    let tokenContent: any = JSON.parse(atob(localStorage.getItem('token').split(".")[1]))
    if(tokenContent.authorities == 'ROLE_0'){
      return true
    }
    return false
  }
}
