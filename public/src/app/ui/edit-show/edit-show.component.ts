import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { Show } from '../models/show';

@Component({
  selector: 'app-edit-show',
  templateUrl: './edit-show.component.html',
  styleUrls: ['./edit-show.component.css']
})
export class EditShowComponent implements OnInit {

  user: any = {};
  show: any = {};
  updateShow: any = {};

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem('currentUser'));
    this.getShow(this.route.snapshot.paramMap.get('id'));

    this.updateShow.title = this.show.title;
    this.updateShow.img = this.show.img;
    this.updateShow.description = this.show.description;
    this.updateShow.link = this.show.link;
  }

  getShow(id) {
    let data = JSON.parse(sessionStorage.getItem('shows'))
    for(let show of data) {
      if (show.id == id) {
        this.show = show;
      }
    }
  }

  getCheckAdmin() {
    return this.user.is_admin;
  }

  submitEdits() {

  }

  resetEdits() {
    this.updateShow.title = this.show.title;
    this.updateShow.img = this.show.img;
    this.updateShow.description = this.show.description;
    this.updateShow.link = this.show.link;
  }
}
