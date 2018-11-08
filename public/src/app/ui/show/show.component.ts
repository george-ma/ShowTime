import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { Show } from '../models/show';
import { MyShow } from '../models/my_show';
import { User } from '../models/user';

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
  updatedTimeout: boolean = false;
  ratingData: Array<MyShow> = [];
  reviews: Array<string> = [];
  rating: number = 0;
  numberOfRatings: number =0;
  status: Array<number> =[];
  show_reviews: boolean = false;



  constructor( public route: ActivatedRoute, public router: Router) { }

  ngOnInit() {
    this.getShow(this.route.snapshot.paramMap.get('id'));
    this.getUser()
    this.getRatingData()
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
    this.myShow = {};
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
    this.updatedTimeout = true;
    setTimeout(() => {
        this.updatedTimeout = false;
    }, 2000);
    this.getUser();
    this.getRatingData()
  }

  getRatingData(){
    this.ratingData = [];
    this.reviews = [];
    let allUsers = [];
    let numberOfRatings = 0;
    let sumofRatings = 0;
    let status = [0, 0, 0, 0, 0];
    allUsers = JSON.parse(sessionStorage.getItem('users'));
    for( let i =0; i < allUsers.length; i++ ){
      for(let j =0; j < allUsers[i].my_shows.length; j++){
        if(allUsers[i].my_shows[j].id == this.show.id){
            this.ratingData.push(allUsers[i].my_shows[j]);
            if(allUsers[i].my_shows[j].review != undefined){
              this.reviews.push(`${allUsers[i].username} : ${allUsers[i].my_shows[j].review}`);
            }
            if(allUsers[i].my_shows[j].rating != undefined){
              numberOfRatings = numberOfRatings +1;
              sumofRatings = sumofRatings + allUsers[i].my_shows[j].rating;
            }
            if(allUsers[i].my_shows[j].status != undefined || allUsers[i].my_shows[j].status != 0){
             status[allUsers[i].my_shows[j].status -1 ] = status[allUsers[i].my_shows[j].status -1 ] +1
            }

        }
      }
    }
    this.numberOfRatings = numberOfRatings;
    this.status = status;
    this.rating = sumofRatings / numberOfRatings;
  }

  showReviews(){
    if(this.show_reviews){
      this.show_reviews = false;
    } else{
      this.show_reviews = true;
    }

  }


}
