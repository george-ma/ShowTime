import { Component, OnInit } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { Router } from '@angular/router';

import { Show } from '../models/show';
import { container } from '@angular/core/src/render3';
import { $ } from 'protractor';

@Component({
  selector: 'app-show-form',
  templateUrl: './show-form.component.html',
  styleUrls: ['./show-form.component.css']
})

// add to global list as unapproved if regular, approved if admin
// editing id , client side approve reject
export class ShowFormComponent{

  constructor(public router: Router) {}

  shows: Array<Show> = []
  model = new Show(42, '','',false,'assets/noImage.jpg','')

  months = ["January", "Feburary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  hours = [24];
  days = [31];
  years = [30];
  date={};

  airingChecked = true;

  submitted = false;

  onSubmit() { this.submitted = true; }  

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }

  setAirDate() {
    if(this.airingChecked) {
      let airDate = new Date();
      airDate.setFullYear(this.date["year"]);

      airDate.setMonth(this.months.indexOf(this.date["month"]));

      airDate.setDate(this.date["day"]);

      airDate.setHours(this.date["hour"]);

      airDate.setMinutes(0);

      airDate.setSeconds(0);

      airDate.setMilliseconds(0);

      this.model.airDate = airDate;
    }
    else {
      this.model.airDate = undefined;
    }
  }

  addNewShow() {
    this.setAirDate();

    this.shows = JSON.parse(sessionStorage.getItem('shows'));
    console.log(this.model)
    this.shows.push(this.model);
    sessionStorage.setItem('shows', JSON.stringify(this.shows));
    this.router.navigate(['/grid']);
  }

  ngOnInit() {
    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();

    for(let i  = 0; i < 24; i++) {
      this.hours[i] = i;
    }

    for(let i = 1; i <= 31; i++) {
      this.days[i] = i;
    }

    for(let i = 0; i < 30; i++) {
      this.years[i] = (currentYear - 15) + i;
    }

    // TODO: hour doesn't fill properly
    this.date["hour"] = this.hours[currentDate.getHours()];
    this.date["day"] = currentDate.getDate();
    this.date["month"] = this.months[currentDate.getMonth()];
    this.date["year"] = currentYear;    
  }
}


