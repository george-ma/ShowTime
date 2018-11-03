import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {

  shows: Array<object>=[];

  constructor() { }

  ngOnInit() {
    let show1 = {
      title: "DareDevil",
      description: "Season 3",
      link: "link",
      img: "assets/dd.jpg"

    }
    this.shows.push(show1);
    this.shows.push(show1);

  }

}
