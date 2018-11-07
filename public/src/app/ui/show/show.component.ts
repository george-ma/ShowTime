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
  constructor( private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.getShow(this.route.snapshot.paramMap.get('id'));
  }

  getShow(id){
    let data = JSON.parse(sessionStorage.getItem('shows'))
    for( let show of data){
      if(show.id == id){
        this.show = show;
      }
    }
    console.log(this.show , id)
  }


}
