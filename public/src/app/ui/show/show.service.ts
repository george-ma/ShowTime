import { Injectable } from '@angular/core';
import { HttpService } from '../../http.service';

@Injectable({
  providedIn: 'root'
})
export class ShowService {

  API_URL = 'http://localhost:8000';

  constructor(private httpClient: HttpService) { }

  addRating(data) {
    return this.httpClient.post(`${this.API_URL}/shows`, data);
  }
}
