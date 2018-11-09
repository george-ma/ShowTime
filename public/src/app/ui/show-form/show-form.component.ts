import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { Show } from '../models/show';
import { container } from '@angular/core/src/render3';
import { $ } from 'protractor';

@Component({
  selector: 'app-show-form',
  templateUrl: './show-form.component.html',
  styleUrls: ['./show-form.component.css']
})

/**
 * Component that manages the "Add New Show" form
 * Form consisting of a title, description, image (not currently working),
 * link, and airing date/interval
 */
export class ShowFormComponent {

  constructor(public router: Router) { }

  shows: Array<Show> = []

  numShows = parseInt(sessionStorage.getItem("numShows"));
  currentUser = JSON.parse(sessionStorage.getItem('currentUser'));

  // Corresponding ngModel for the HTML of this component
  model = new Show(this.numShows + 1, '', '', this.currentUser.is_admin, 'assets/noImage.jpg', '')

  months = ["January", "Feburary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  hours = [];
  days = [];
  years = [];
  date = {};

  airingChecked = false;
  intervalChecked = false;
  popup = false;

  /**
   * Initializes the form information
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

    this.date["hour"] = this.hours[currentDate.getHours()];
    this.date["day"] = currentDate.getDate();
    this.date["month"] = this.months[currentDate.getMonth()];
    this.date["year"] = currentYear;
  }

  /**
   * Adds the newly-added show to the sessionStorage, and increments numShows
   * Displays a successful notification when submitted
   */
  addNewShow() {
    this.setAirDate();

    this.shows = JSON.parse(sessionStorage.getItem('shows'));
    this.shows.push(this.model);
    sessionStorage.setItem('shows', JSON.stringify(this.shows));
    sessionStorage.setItem('numShows', JSON.stringify(this.numShows + 1))

    this.popup = true;
    setTimeout(() => {
      this.router.navigate(['/grid']);
    }, 2000);
  }

  /**
 * Sets the date object once submit is clicked.
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
        this.model.airDate = airDate.toISOString();
      }

      else {
        this.model.airDate = undefined;
      }
    }
  }

}
