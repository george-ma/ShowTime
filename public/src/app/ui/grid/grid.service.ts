import { Injectable } from '@angular/core';
import { HttpService } from '../../http.service';

@Injectable({
  providedIn: 'root'
})
export class GridService {

  constructor(private httpClient: HttpService) { }

  API_URL = 'http://localhost:8000';


  /**
   *  User related API calls
   */

  userAddShow(id, data) {
    return this.httpClient.post(`${this.API_URL}/users/${id}/addshow`, data);
  }

  userRemoveShow(id, data) {
    return this.httpClient.post(`${this.API_URL}/users/${id}/removeshow`, data);
  }

  getMyShows(id) {
    return this.httpClient.get(`${this.API_URL}/users/${id}/myshows`);
  }

  getNotMyShows(id) {
    return this.httpClient.get(`${this.API_URL}/users/${id}/notmyshows`);
  }


  /**
   *  Show related API calls
   */

  getApprovedShows() {
    return this.httpClient.get(`${this.API_URL}/shows/approved`);
  }

  getUnapprovedShows() {
    return this.httpClient.get(`${this.API_URL}/shows/unapproved`);
  }

  addShow(data) {
    return this.httpClient.post(`${this.API_URL}/shows`, data);
  }

  editShow(id, data) {
    return this.httpClient.post(`${this.API_URL}/shows/${id}/edit`, data);
  }

  removeShow(data) {
    return this.httpClient.post(`${this.API_URL}/shows/remove`, data);
  }

  approveShow(data) {
    return this.httpClient.post(`${this.API_URL}/shows/approve`, data);
  }
}
