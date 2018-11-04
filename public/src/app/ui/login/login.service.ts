import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  // returns true iff user is logged in, otherwise returns false
  getCheckUser() {
	  return sessionStorage.getItem('currentUser') != null;
  }

  getUser(){
  return JSON.parse(sessionStorage.getItem('currentUser'));
  }

}
