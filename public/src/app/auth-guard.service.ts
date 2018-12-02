import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})

// authentication guard for routes which require user to be logged in
export class AuthGuardService implements CanActivate {

  API_URL = 'http://localhost:8000';

  constructor(private httpClient: HttpService, public router: Router) { }

  // required to implement CanActivate interface
  canActivate(): boolean {
    this.sessionChecker().subscribe((response: boolean)=>{
      if(!response){
        this.router.navigate(['login']);
      }
      return true
    }, (error) => {
      this.router.navigate(['login']);
      return false
    });
    return true
  }

  sessionChecker(){
    return this.httpClient.get(`${this.API_URL}/sessionchecker`);
  }


}
