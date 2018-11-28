import { Injectable } from '@angular/core';
import { HttpService } from '../../http.service';

@Injectable({
  providedIn: 'root'
})
export class EditShowService {

  constructor(private httpClient: HttpService) { }

  API_URL = 'http://localhost:8000';

  getShowbyId(id) {
    return this.httpClient.get(`${this.API_URL}/shows/${id}`);
  }
}
