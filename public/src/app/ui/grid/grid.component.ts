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
  error: boolean = false;
  user: any = {};

  all: boolean = true;
  my_shows: boolean = false;
  unapproved_shows: boolean = false;

  constructor(private gridService: GridService, public router: Router) { }

  ngOnInit() {
    let show1 = {
      id: 1,
      title: "DareDevil",
      description: "Season 1",
      link: "out",
      img: "assets/dd.jpg",
      approved: true
    }
    let show4 = {
      id: 4,
      title: "DareDevil",
      description: "Season 2",
      link: "in",
      img: "assets/dd.jpg",
      approved: true
    }
    let show2 = {
      id: 2,
      title: "DareDevil",
      description: "Season 3",
      link: "left",
      img: "assets/dd.jpg",
      approved: false
    }
    let show3 = {
      id: 3,
      title: "DareDevil",
      description: "Season 4",
      link: "right",
      img: "assets/dd.jpg",
      approved: false
    }
    this.shows.push(show1);
    this.shows.push(show2);
    this.shows.push(show3);
    this.shows.push(show4);

    if(sessionStorage.getItem('shows') == null){
      this.gridService.addShow(this.shows);
    }
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
    this.shows.push(this.unapprovedShows[i]);
    this.unapprovedShows.splice(i, 1);
  }

  reject(id){
    let i = 0;
    for( i; i < this.unapprovedShows.length; i++ ){
      if(this.unapprovedShows[i].id == id){
        break;
      }
    }
    this.unapprovedShows.splice(i, 1);
  }
}