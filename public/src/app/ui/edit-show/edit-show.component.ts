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

  user: any = {}
  show: Show
  shows: Array<Show> = []
  updateShow = new Show(-1, '', '', false, 'assets/noImage.jpg', '')

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.shows = JSON.parse(sessionStorage.getItem('shows'));
    this.user = JSON.parse(sessionStorage.getItem('currentUser'));
    this.show = this.getShow(this.route.snapshot.paramMap.get('id'));

    this.copyShowAttributes(this.updateShow, this.show);
  }

  getShow(id) {
    let data = JSON.parse(sessionStorage.getItem('shows'))
    for (let show of data) {
      if (show.id == id) {
        return show;
      }
    }
  }

  getCheckAdmin() {
    return this.user.is_admin;
  }

  submitEdits() {
    if (this.getCheckAdmin()) {
      this.updateShow.approved = true;
      for (let i = 0; i < this.shows.length; i++) {
        if (this.shows[i].id == this.show.id) {
          this.copyShowAttributes(this.shows[i], this.updateShow);
          break;
        }
      }

    } else {
      this.shows.push(this.updateShow);
    }

    sessionStorage.setItem('shows', JSON.stringify(this.shows));
    this.router.navigate(['/grid']);
  }

  resetEdits() {
    this.copyShowAttributes(this.updateShow, this.show);
  }

  copyShowAttributes(show, showToCopy) {
    show.id = showToCopy.id;
    show.title = showToCopy.title;
    show.img = showToCopy.img;
    show.description = showToCopy.description;
    show.link = showToCopy.link;
  }
}
