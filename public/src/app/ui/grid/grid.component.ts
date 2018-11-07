import { Component, OnInit } from '@angular/core';
import { GridService } from './grid.service';
import { Show } from '../models/show';
import { MyShow } from '../models/my_show';
import { User } from '../models/user';
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
  myShows: Array<Show>=[];
  error: boolean = false;
  user: any = {};
  allUsers: Array<User> = [];

  all: boolean = true;
  my_shows: boolean = false;
  unapproved_shows: boolean = false;

  constructor(private gridService: GridService, public router: Router) { }

  ngOnInit() {

    this.getShows();
    this.getUser();
  }

  getCheckUser() {
    return sessionStorage.getItem('currentUser') != null;
  }
  getUser(){
    if(sessionStorage.getItem('currentUser') != null){
      this.user = JSON.parse(sessionStorage.getItem('currentUser'));
      return true;
    }
    return false;

  }

  getShows(){
    let data = this.gridService.getShows()
    this.shows = [];
    this.myShows = [];
    this.unapprovedShows = [];
    this.getUser();
    for( let show of data){
      if(show.approved == true){
        if( this.getCheckUser() && this.InMyShows(show.id) ){
          this.myShows.push(show);
        } else{
          this.shows.push(show);
        }
      } else{
        this.unapprovedShows.push(show);
      }
    }
  }

  InMyShows(id){
    for ( let my_show of this.user.my_shows){
      if(my_show.id == id){
        return true;
      }
    }
    return false;
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

  addToMyShows(id){
    this.user.my_shows.push(new MyShow(id));
    this.updateSessionMyShows();
  }

  RemoveFromMyShows(id){
    let i = 0;
    for( i; i < this.user.my_shows.length; i++ ){
      if(this.user.my_shows[i].id == id){
        break;
      }
    }
    this.user.my_shows.splice(i, 1);
    this.updateSessionMyShows();
  }

  updateSessionMyShows(){
    this.allUsers = []
    this.allUsers = JSON.parse(sessionStorage.getItem('users'));
    sessionStorage.setItem('currentUser', JSON.stringify(this.user));
    let i = 0;
    for( i; i < this.allUsers.length; i++ ){
      if(this.allUsers[i].username == this.user.username){
         this.allUsers[i].my_shows = this.user.my_shows;
      }
    }
    sessionStorage.setItem('users', JSON.stringify(this.allUsers));
    this.getShows();
  }

  updateSessionShows(){
    this.sessionShows = [];
    for( let show of this.unapprovedShows){
      this.sessionShows.push(show);
    }

    for( let show of this.shows){
      this.sessionShows.push(show);
    }

    for( let show of this.myShows){
      this.sessionShows.push(show);
    }
    sessionStorage.setItem('shows', JSON.stringify(this.sessionShows));
    this.getShows();
  }
}

export class User {
  email: string;
  username: string;
  password: string;
  is_admin: boolean;
  is_banned: boolean;
  my_shows: Array<number>;
}
