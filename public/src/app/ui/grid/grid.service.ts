import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GridService {

  constructor() { }

  addShow(shows) {
    sessionStorage.setItem('shows', JSON.stringify(shows));
  }

  getShows() {
    return JSON.parse(sessionStorage.getItem('shows'))
  }

}
