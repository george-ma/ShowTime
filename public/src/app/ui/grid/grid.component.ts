import { Component, OnInit } from '@angular/core';
import { GridService } from './grid.service';
import { Show } from '../models/show';
import { Router } from '@angular/router';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {

  shows: Array<Show>=[];
  unapprovedShows:  Array<Show>=[];
  sessionShows: Array<Show>=[];
  error: boolean = false;
  user: any = {};

  all: boolean = true;
  my_shows: boolean = false;
  unapproved_shows: boolean = false;

  constructor(private gridService: GridService, public router: Router) { }

  ngOnInit() {

    this.getShows();
  }

  getCheckUser() {
    return sessionStorage.getItem('currentUser') != null;
  }
  getUser(){
    if(sessionStorage.getItem('currentUser') != null){
      this.user = JSON.parse(sessionStorage.getItem('currentUser'));
      return true;
    }
    console.log(this.user);
    return false;

  }

  getShows(){
    let data = this.gridService.getShows()
    this.shows = [];
    this.unapprovedShows = [];
    for( let show of data){
      if(show.approved == true){
        this.shows.push(show);
      } else{
        this.unapprovedShows.push(show);
      }
    }
  }

  selectAll(){
    this.all = true;
    this.my_shows = false;
    this.unapproved_shows = false;
  }

  selectMy(){
    this.all = false;
    this.my_shows = true;
    this.unapproved_shows = false;
  }

  selectUn(){
    this.all = false;
    this.my_shows = false;
    this.unapproved_shows = true;
  }

  approve(id){
    let i = 0;
    for( i; i < this.unapprovedShows.length; i++ ){
      if(this.unapprovedShows[i].id == id){
        break;
      }
    }
    this.unapprovedShows[i].approved = true;
    this.shows.push(this.unapprovedShows[i]);
    this.unapprovedShows.splice(i, 1);
    this.updateSessionShows()
  }

  reject(id){
    let i = 0;
    for( i; i < this.unapprovedShows.length; i++ ){
      if(this.unapprovedShows[i].id == id){
        break;
      }
    }
    this.unapprovedShows.splice(i, 1);
    this.updateSessionShows()
  }

  updateSessionShows(){
    this.sessionShows = [];
    for( let show of this.unapprovedShows){
      this.sessionShows.push(show);
    }

    for( let show2 of this.shows){
      this.sessionShows.push(show2);
    }
    sessionStorage.setItem('shows', JSON.stringify(this.sessionShows));
    this.getShows();
  }
}
