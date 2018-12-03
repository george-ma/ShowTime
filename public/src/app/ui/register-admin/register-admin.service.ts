import { Injectable } from '@angular/core';
import { HttpService } from '../../http.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterAdminService {

  API_URL = 'http://localhost:8000';

  constructor(private httpClient: HttpService) { }

  addAdmin(data) {
    return this.httpClient.post(`${this.API_URL}/users/admin`, data);
  }

}
