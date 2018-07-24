import { environment } from './../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  isLoggedIn() {
    return localStorage.getItem('token') ? true : false;
  }

  getAccessToken() {
    return JSON.parse(localStorage.getItem('token')).id;
  }

  login(data) {
    const headers = new HttpHeaders({
  		'Content-Type': 'application/json'
  	});

  	return this.http.post(`${environment.api_url}/users/login`, data, { headers: headers });
  }

  logout() {  
    let token = this.getAccessToken();

    return this.http.post(`${environment.api_url}/Users/logout?access_token=${token}`, {});
  }
}
