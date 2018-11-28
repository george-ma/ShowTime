import { Injectable } from '@angular/core';
import { HttpService } from '../../http.service';

@Injectable({
  providedIn: 'root'
})
export class ShowFormService {

  API_URL = 'http://localhost:8000';

  constructor(private httpClient: HttpService) { }

  addShow(data) {
    return this.httpClient.post(`${this.API_URL}/shows`, data);
  }

  uploadFile(data){
    return this.httpClient.upload(`${this.API_URL}/upload`, data);
  }
}
