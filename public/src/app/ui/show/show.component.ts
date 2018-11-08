import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { Show } from '../models/show';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {

  show: any = {};
  user: any = {};
  myShow: any = {};
  inMyShows: boolean = false;


  constructor( private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.getShow(this.route.snapshot.paramMap.get('id'));
    this.getUser()
  }

  getShow(id){
    let data = JSON.parse(sessionStorage.getItem('shows'))
    for( let show of data){
      if(show.id == id){
        this.show = show;
      }
    }
  }

  getCheckUser() {
    return sessionStorage.getItem('currentUser') != null;
  }
  getUser(){
    if(sessionStorage.getItem('currentUser') != null){
      this.user = JSON.parse(sessionStorage.getItem('currentUser'));
      this.setMyShow();
      return true;
    }
    return false;
  }

  setMyShow(){
    for(let my_show of this.user.my_shows){
      if(my_show.id == this.show.id){
        this.myShow = my_show;
        this.inMyShows = true
        return
      }
    }
    this.inMyShows = false;
  }

  setRating(stars){
    this.myShow.rating = stars;
  }

  setStatus(status){
    this.myShow.status = status;
  }

  updateMyShows(){
    if(this.inMyShows){
      let i = 0;
      for( i; i < this.user.my_shows.length; i++ ){
        if(this.user.my_shows[i].id == this.show.id){
            this.user.my_shows[i] = this.myShow;
        }
      }
    } else{
      this.myShow.id = this.show.id;
      this.user.my_shows.push(this.myShow);
    }
    this.updateSessionMyShows();
  }

  updateSessionMyShows(){
    let allUsers = []
    allUsers = JSON.parse(sessionStorage.getItem('users'));
    sessionStorage.setItem('currentUser', JSON.stringify(this.user));
    let i = 0;
    for( i; i < allUsers.length; i++ ){
      if(allUsers[i].username == this.user.username){
         allUsers[i].my_shows = this.user.my_shows;
      }
    }
    sessionStorage.setItem('users', JSON.stringify(allUsers));
    this.getUser();
  }



}
