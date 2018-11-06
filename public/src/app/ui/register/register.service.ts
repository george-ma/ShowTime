import { Injectable } from '@angular/core';
import { HttpService} from '../../http.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  API_URL = 'http://localhost:8000/api';

  constructor(private httpClient: HttpService) { }

  addUser(data) {
    // Call to get all the PRacticals
    return this.httpClient.post(`${this.API_URL}/users`, data);
  }

}
