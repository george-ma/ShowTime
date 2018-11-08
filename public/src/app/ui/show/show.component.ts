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
      }
    }
  }

  setRating(stars){
    this.myShow.rating = stars;
  }

  setStatus(status){
    this.myShow.status = status;
  }


}
