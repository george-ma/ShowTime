import { Injectable } from '@angular/core';
import { HttpService } from '../../http.service';

@Injectable({
  providedIn: 'root'
})
export class AdminUserListService {

    API_URL = 'http://localhost:8000';

    constructor(private httpClient: HttpService) { }
    
    fetchUsers() {
        return this.httpClient.get(`${this.API_URL}/users`)
    }

    banUser(user) {
        return this.httpClient.post(`${this.API_URL}/users/${user._id}/update`, user);
    }
}
