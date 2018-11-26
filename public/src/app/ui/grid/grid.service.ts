import { Injectable } from '@angular/core';
import { HttpService } from '../../http.service';

@Injectable({
  providedIn: 'root'
})
export class GridService {

  constructor(private httpClient: HttpService) { }

  API_URL = 'http://localhost:8000';

  addShow(data) {
    return this.httpClient.post(`${this.API_URL}/shows`, data);
  }

  userAddShow(id, data) {
    return this.httpClient.post(`${this.API_URL}/users/${id}/addshow`, data);
  }

  userRemoveShow(id, data) {
    return this.httpClient.post(`${this.API_URL}/users/${id}/removeshow`, data);
  }

  getApprovedShows() {
    return this.httpClient.get(`${this.API_URL}/shows/approved`);
  }

  getUnapprovedShows() {
    return this.httpClient.get(`${this.API_URL}/shows/unapproved`);
  }

  getMyShows(param) {
    return this.httpClient.get(`${this.API_URL}/users/${param}/myshows`);
  }

  getNotMyShows(param) {
    return this.httpClient.get(`${this.API_URL}/users/${param}/notmyshows`);
  }

}
