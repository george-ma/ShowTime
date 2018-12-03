import { Injectable } from '@angular/core';
import { HttpService } from '../../http.service';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  API_URL = 'http://localhost:8000';

  constructor(private httpClient: HttpService) { }

  logout(){
    return this.httpClient.get(`${this.API_URL}/logout`);
  }

  getSessionUser(){
    return this.httpClient.get(`${this.API_URL}/getsessionuser`);
  }

}
