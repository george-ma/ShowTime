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

    submitted = false;

    onSubmit() { this.submitted = true; }  

    // TODO: Remove this when we're done
    get diagnostic() { return JSON.stringify(this.model); }

    addNewShow() {
        this.shows = JSON.parse(sessionStorage.getItem('shows'));
        this.shows.push(this.model);
        sessionStorage.setItem('shows', JSON.stringify(this.shows));
        this.router.navigate(['/grid']);
    }

    ngOnInit() {

    }
}

