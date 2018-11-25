import { Injectable } from '@angular/core';
import { HttpService } from '../../http.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

    API_URL = 'http://localhost:8000';

    constructor(private httpClient: HttpService) { }

    editUser(data) {
        console.log(data);
        return this.httpClient.post(`${this.API_URL}/users/${data._id}/update`, data);
        //return this.httpClient.post(`${this.API_URL}/users/:id/update`, data);
    }
}
