import { Injectable } from '@angular/core';
import { HttpService } from '../../http.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  API_URL = 'http://localhost:8000';

  constructor(private httpClient: HttpService) { }

  // returns true iff user is logged in, otherwise returns false
  getCheckUser() {
    return sessionStorage.getItem('currentUser') != null;
  }

  getUser() {
    return JSON.parse(sessionStorage.getItem('currentUser'));
  }

  loginUser(data){
    return this.httpClient.post(`${this.API_URL}/users/login`, data);
  }

}
