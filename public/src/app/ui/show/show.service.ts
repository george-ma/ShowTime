import { Injectable } from '@angular/core';
import { HttpService } from '../../http.service';

@Injectable({
  providedIn: 'root'
})
export class ShowService {

  API_URL = 'http://localhost:8000';

  constructor(private httpClient: HttpService) { }

  getShow(id) {
    return this.httpClient.get(`${this.API_URL}/shows/${id}`);
  }

  getShowAvg(id) {
    return this.httpClient.get(`${this.API_URL}/rating/avg/${id}`);
  }

  getShowStatus(id) {
    return this.httpClient.get(`${this.API_URL}/rating/status/${id}`);
  }

  getShowReviews(id) {
    return this.httpClient.get(`${this.API_URL}/rating/review/${id}`);
  }

  getMyRating(user_id, show_id){
    return this.httpClient.get(`${this.API_URL}/rating/user/${user_id}/${show_id}`);
  }

  addRating(data) {
    return this.httpClient.post(`${this.API_URL}/rating`, data);
  }

  isMyShow(user_id, show_id) {
    return this.httpClient.get(`${this.API_URL}/users/${user_id}/show/${show_id}`);
  }

  userAddShow(id, data) {
    return this.httpClient.post(`${this.API_URL}/users/${id}/addshow`, data);
  }

  userRemoveShow(id, data) {
    return this.httpClient.post(`${this.API_URL}/users/${id}/removeshow`, data);
  }

  getSessionUser(){
    return this.httpClient.get(`${this.API_URL}/getsessionuser`);
  }

}
