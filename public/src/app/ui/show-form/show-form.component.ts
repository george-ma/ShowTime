import { Component, OnInit } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { Router } from '@angular/router';

import { Show } from '../models/show';

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

    numShows = parseInt(sessionStorage.getItem("numShows"));

    model = new Show(this.numShows+1, '', '', false, 'assets/noImage.jpg', '')

    submitted = false;

    onSubmit() { this.submitted = true; }

    addNewShow() {
        this.shows = JSON.parse(sessionStorage.getItem('shows'));
        this.shows.push(this.model);
        sessionStorage.setItem('shows', JSON.stringify(this.shows));
        sessionStorage.setItem('numShows', JSON.stringify(this.numShows+1))
        this.router.navigate(['/grid']);
    }
}
