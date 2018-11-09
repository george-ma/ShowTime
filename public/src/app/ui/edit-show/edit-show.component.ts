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

  // Global Variables that will store data from the sessionStorage on ngInit()
  user: any = {}
  show: Show
  shows: Array<Show> = []

  // Corresponding model for the html
  updateShow = new Show(-1, '', '', false, 'assets/noImage.jpg', '')

  months = ["January", "Feburary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  hours = [];
  days = [];
  years = [];
  date = {};

  airingChecked = false;
  intervalChecked = false;
  popup = false;

  constructor(private route: ActivatedRoute, private router: Router) { }

  /**
   * Initializes the airing date form information and the global variables
   */
  ngOnInit() {
    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();

    for (let i = 0; i < 24; i++) {
      this.hours[i] = i;
    }
    for (let i = 1; i <= 31; i++) {
      this.days[i] = i;
    }
    for (let i = 0; i < 30; i++) {
      this.years[i] = (currentYear - 15) + i;
    }

    // TODO: hour doesn't fill properly
    this.date["hour"] = this.hours[currentDate.getHours()];
    this.date["day"] = currentDate.getDate();
    this.date["month"] = this.months[currentDate.getMonth()];
    this.date["year"] = currentYear;

    this.shows = JSON.parse(sessionStorage.getItem('shows'));
    this.user = JSON.parse(sessionStorage.getItem('currentUser'));
    this.show = this.getShow(this.route.snapshot.paramMap.get('id'));

    this.copyShowAttributes(this.updateShow, this.show);
  }

  /**
   * Returns the corresponding show stored in the sessionStorage for
   * the passed in id
   * @param id - id of the currently edited show
   */
  getShow(id) {
    let data = JSON.parse(sessionStorage.getItem('shows'))
    for (let show of data) {
      if (show.id == id) {
        return show;
      }
    }
  }
  /**
   * Sets the airing-date for the corresponding show
   */
  setAirDate() {
    if (this.airingChecked) {
      let airDate = new Date();

      airDate.setFullYear(this.date["year"]);
      airDate.setMonth(this.months.indexOf(this.date["month"]));
      airDate.setDate(this.date["day"]);
      airDate.setHours(this.date["hour"]);
      airDate.setMinutes(0);
      airDate.setSeconds(0);
      airDate.setMilliseconds(0);

      // NaN if date is invalid, which would fail this
      if (airDate.getTime() === airDate.getTime()) {
        this.updateShow.airDate = airDate.toISOString();

      } else {
        this.updateShow.airDate = undefined;
      }
    }
  }

  /**
   * Returns whether the session storage current user is an admin
   */
  getCheckAdmin() {
    return this.user.is_admin;
  }

  /**
   * Corresponding function for the on-click of the "submit" button
   * Sets the air date of the currently edited show and updates the show
   * information in the sessionStorage
   */
  submitEdits() {
    this.setAirDate();

    // Automatically edits the show if the user is an admin
    if (this.getCheckAdmin()) {
      this.updateShow.approved = true;
      for (let i = 0; i < this.shows.length; i++) {
        if (this.shows[i].id == this.show.id) {
          this.copyShowAttributes(this.shows[i], this.updateShow);
          break;
        }
      }

      // Otherwise, push to the unapproved shows if a regular user
    } else {
      this.shows.push(this.updateShow);
    }

    sessionStorage.setItem('shows', JSON.stringify(this.shows));

    // Creates successful notification and redirects user to the grid
    this.popup = true;
    setTimeout(() => {
      this.router.navigate(['/grid']);
    }, 2000);
  }

  /**
   * Corresponding action for the 'discard changes' button
   */
  resetEdits() {
    this.copyShowAttributes(this.updateShow, this.show);
  }

  /**
   * Helper function that copies the attributes of showToCopy to show
   */
  copyShowAttributes(show, showToCopy) {
    show.id = showToCopy.id;
    show.title = showToCopy.title;
    show.img = showToCopy.img;
    show.description = showToCopy.description;
    show.link = showToCopy.link;

    if (showToCopy.airDate) {
      show.airDate = showToCopy.airDate;
    }
    if (showToCopy.airInterval) {
      show.airInterval = showToCopy.airInterval;
    }
  }
}
