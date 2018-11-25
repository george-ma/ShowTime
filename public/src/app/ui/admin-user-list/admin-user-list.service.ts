import { Injectable } from '@angular/core';
import { HttpService } from '../../http.service';

@Injectable({
  providedIn: 'root'
})
export class AdminUserListService {

    API_URL = 'http://localhost:8000';

    constructor(private httpClient: HttpService) { }

    banUser(data){
        
    }
}
