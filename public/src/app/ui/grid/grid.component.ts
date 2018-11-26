/**
 * @file
 * Component that displays the shows in the site's database.
 * Users can get information about the shows and add shows to their
 * personal list. Admins can accept new shows, edit existing shows,
 * or delete them.
 *
 */

import { Component, OnInit } from '@angular/core';
import { GridService } from './grid.service';
import { Show } from '../models/show';
import { MyShow } from '../models/my_show';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {

  //list of all shows (that are approved)
  shows: Array<Show>=[];
  //list of all unapproved shows
  unapprovedShows:  Array<Show>=[];
  // list of all shows in the session storage
  sessionShows: Array<Show>=[];
  // list of all shows that the current user follows and (that are approved)
  myShows: Array<Show>=[];
  // boolean for form errors
  error: boolean = false;
  errorMsg: string;
  // user object to bind current user
  user: any = {};
  // arry to bind all users from session storage
  allUsers: Array<User> = [];
  // toggle for all shows tab
  all: boolean = true;
  // toggle for my shows tab
  my_shows: boolean = false;
  // toggle for unapproved shows tab
  unapproved_shows: boolean = false;
  // string to bind search input
  search: string ='';

  // // error checking
  // error: boolean = false;
  // errorMsg: string;


  constructor(private gridService: GridService, public router: Router) { }

  ngOnInit() {
    this.getUser();
    this.getShows();
  }

  /**
   * Checks if there is a user logged in.
   */
  getCheckUser() {
    return sessionStorage.getItem('currentUser') != null;
  }

  /**
   * Retrieves the current user info if a user is logged in.
   */
  getUser(){
    if(sessionStorage.getItem('currentUser') != null){
      this.user = JSON.parse(sessionStorage.getItem('currentUser'));
      return true;
    }
    return false;
  }

  /**
   * Adds the list of shows into the correct list.
   */
  getShows(){
    if (this.getCheckUser()) {
      this.gridService.getMyShows(this.user._id).subscribe((response: Array<Show>) => {
        this.myShows = response;
        this.error = false;

      }, (error) => {
        this.error = true;
      });

      this.gridService.getNotMyShows(this.user._id).subscribe((response: Array<Show>) => {
        this.shows = response;
        this.error = false;

      }, (error) => {
        this.error = true;
      });

      if (this.user.is_admin) {
        this.gridService.getUnapprovedShows().subscribe((response: Array<Show>) => {
          this.unapprovedShows = response;
          this.error = false;

        }, (error) => {
          this.error = true;
        });
      }

    } else {

      this.gridService.getApprovedShows().subscribe((response: Array<Show>) => {
        this.shows = response;
        this.error = false;

      }, (error) => {
        this.error = true;
      });
    }

  }

  /**
   * Returns the next episode to air of a given show.
   *
   * @param {Show} show
   * Show we want to get info about
   */
  getNextEpisode(show: Show) {
    if(show.airDate != undefined && show.airInterval != undefined) {
      let airDate = new Date(show.airDate);
      let current = new Date();

      let timeSinceAir = Math.abs(current.getTime() - airDate.getTime());

      // int is number of ms in a day
      let intervalTime = 86400000 * show.airInterval;
      let nextEpisode;

      if(airDate > current) {
        nextEpisode = 1;
      }
      else {
        nextEpisode = Math.ceil(timeSinceAir / intervalTime) + 1
      }
      return nextEpisode;
    }
  }

  /**
   * Returns the number of seconds remaining until the
   * next episode of the given show.
   *
   * @param {Show} show
   * Show we want to get info about
   */
  getTimeRemaining(show: Show) {
    if(show.airDate != undefined && show.airInterval != undefined) {
      let airDate = new Date(show.airDate);
      let current = new Date();

      let timeSinceAir = Math.abs(current.getTime() - airDate.getTime());

      // int is number of ms in a day
      let intervalTime = 86400000 * show.airInterval;
      let remaining;

      if(airDate > current) {
        remaining = timeSinceAir;
      }
      else {
        let nextEpisode = Math.ceil(timeSinceAir / intervalTime) + 1
        let timeFromFirstAir = (nextEpisode - 1) * intervalTime;
        remaining = (airDate.getTime() + timeFromFirstAir) - current.getTime();
      }

      let remainingInSeconds = Math.floor(remaining / 1000);
      return remainingInSeconds;
    }
  }

  /**
   * Checks if the show with id id is in the
   * current user's shows
   *
   * @param {number} id
   * ID of the show we are looking for
   */
  InMyShows(id){
    for ( let my_show of this.user.my_shows){
      if(my_show.id == id){
        return true;
      }
    }
    return false;
  }

  /**
   * Sets the current tab to be "All Shows"
   */
  selectAll(){
    this.all = true;
    this.my_shows = false;
    this.unapproved_shows = false;
  }

  /**
   * Sets the current tab to be "My Shows"
   */
  selectMy(){
    this.all = false;
    this.my_shows = true;
    this.unapproved_shows = false;
  }

  /**
   * Sets the current tab to be "Unapproved Shows"
   */
  selectUn(){
    this.all = false;
    this.my_shows = false;
    this.unapproved_shows = true;
  }

  /**
   * Sets the show with id id to be approved. Also adds
   * the show to the right lists.
   *
   * @param {number} id
   * ID of the show we want to approve
   */
  approve(id){
    let i = 0;
    for (i; i < this.unapprovedShows.length; i++) {
      if (this.unapprovedShows[i].id == id) {
        break;
      }
    }

    this.unapprovedShows[i].approved = true;

    let modifiedShow = null;
    let foundShow = false;


    if (!foundShow) {
        this.shows.push(this.unapprovedShows[i]);
    } else { // show was modified. code from updateSessionShows()
        this.getShows();
        this.sessionShows = [];
        for( let show of this.unapprovedShows){
            this.sessionShows.push(show);
        }

        for( let show of this.shows){
            if (show.id == modifiedShow.id) {
                this.copyShowAttributes(show, modifiedShow);
                this.sessionShows.push(show);
            }
            this.sessionShows.push(show);
        }

        for( let show of this.myShows){
            if (show.id == modifiedShow.id) {
                this.copyShowAttributes(show, modifiedShow);
                this.sessionShows.push(show);
            }
            this.sessionShows.push(show);
        }
    }

    this.unapprovedShows.splice(i, 1);
    this.updateSessionShows()
  }

  /**
   * Copies the attributes of shows to showToCopy
   *
   * @param {Show} show
   * The show we want to push attributes to
   * @param {Show} showToCopy
   * The show we want to copy attributes from
   */
  copyShowAttributes(show, showToCopy) {
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
    return show;
  }

  /**
   * Removes a show from the list of unapproved shows.
   *
   * @param {number} id
   * The ID of the show we want to remove
   */
  reject(id){
    let i = 0;
    for( i; i < this.unapprovedShows.length; i++ ){
      if(this.unapprovedShows[i].id == id){
        break;
      }
    }
    this.unapprovedShows.splice(i, 1);
    this.updateSessionShows()
  }

  /**
   * Adds the show with ID id to the current user's shows
   *
   * @param {number} id
   * The ID of the show we want to add to the
   * current user's shows
   */
  addToMyShows(id){
    this.user.my_shows.push(new MyShow(id));
    this.updateSessionMyShows();
  }

  /**
   * Removes the show with the ID id from the
   * current user's show
   *
   * @param {number} id
   * The ID of the show we want to remove from the
   * current user's shows
   */
  RemoveFromMyShows(id){
    let i = 0;
    for( i; i < this.user.my_shows.length; i++ ){
      if(this.user.my_shows[i].id == id){
        break;
      }
    }
    this.user.my_shows.splice(i, 1);
    this.updateSessionMyShows();
  }

  /**
   * Updates the session storage with the local versions of
   * the user and users data.
   */
  updateSessionMyShows(){
    this.allUsers = []
    this.allUsers = JSON.parse(sessionStorage.getItem('users'));
    sessionStorage.setItem('currentUser', JSON.stringify(this.user));
    let i = 0;
    for( i; i < this.allUsers.length; i++ ){
      if(this.allUsers[i].username == this.user.username){
         this.allUsers[i].my_shows = this.user.my_shows;
      }
    }
    sessionStorage.setItem('users', JSON.stringify(this.allUsers));
    this.getShows();
  }

  /**
   * Updates the session storage with the local lists of shows
   */
  updateSessionShows(){
    this.sessionShows = [];
    for( let show of this.unapprovedShows){
      this.sessionShows.push(show);
    }

    for( let show of this.shows){
      this.sessionShows.push(show);
    }

    for( let show of this.myShows){
      this.sessionShows.push(show);
    }
    sessionStorage.setItem('shows', JSON.stringify(this.sessionShows));
    this.getShows();
  }

  /**
   * Removes all shows that don't match a search query from
   * the local lists of shows.
   */
  getRegxShows(){
    let reg = RegExp(`^${this.search}`, 'i');
    reg.ignoreCase;
    let data:Array<Show> = [];
    this.shows = [];
    this.myShows = [];
    this.unapprovedShows = [];
    this.getUser();
    for( let show of data){
      if(show.approved == true && reg.test(show.title)){
        if( this.getCheckUser() && this.InMyShows(show.id) ){
          this.myShows.push(show);
        } else{
          this.shows.push(show);
        }
      } else{
        if(reg.test(show.title)){
          this.unapprovedShows.push(show);
        }
      }
    }
  }
}
