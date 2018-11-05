import { Component, OnInit } from '@angular/core';
import { GridService } from './grid.service';

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

  constructor(private gridService: GridService) { }

  ngOnInit() {
    let show1 = {
      title: "DareDevil",
      description: "Season 3",
      link: "link",
      img: "assets/dd.jpg",
      approved: true

    }
    let show2 = {
      title: "DareDevil",
      description: "Season 3",
      link: "hnnn",
      img: "assets/dd.jpg",
      approved: false

    }
    this.shows.push(show1);
    this.shows.push(show2);
    this.shows.push(show1);
    this.shows.push(show2);
    if(sessionStorage.getItem('shows') == null)){
      this.gridService.addShow(this.shows);
    }else {
      this.getShows();
    }




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

export class Show {
  title: string;
  description: string;
  link: string;
  img: string;
  approved: boolean;
}
