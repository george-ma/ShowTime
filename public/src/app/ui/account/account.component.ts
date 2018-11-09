/**
 * @file
 * Displays information about the current user, and shows fields
 * for changing them.
 * 
 */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  // stores a local copy of the current user
  user: any = {};
  // contains the values from the user forms.
  updateUser: any = {};

  constructor() { }

  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem('currentUser'));
    if (!this.user.bio) {
      this.user.bio = "hello I am a dummy user and this is my bio";
    }
    if (!this.user.profilePic) {
      this.user.profilePic = "../../assets/profilepic.png";
    }
  }

  /**
   * Updates the list of users and the current user with
   * the new information from the user forms.
   */
  updateUserInfo() {
    // update user info in user list
    let users = JSON.parse(sessionStorage.getItem('users'));
    for (let curUser of users) {
      if (curUser.username == this.user.username) {
        if (this.updateUser.email) {
          curUser.email = this.updateUser.email;
        }
        if (this.updateUser.username) {
          curUser.username = this.updateUser.username;
        }
        if (this.updateUser.password) {
          curUser.password = this.updateUser.password;
        }
        break;
      }
    }
    sessionStorage.setItem('users', JSON.stringify(users));

    // update currentUser
    if (this.updateUser.profilePic) {
      this.user.profilePic = this.updateUser.profilePic;
    }
    if (this.updateUser.email) {
      this.user.email = this.updateUser.email;
    }
    if (this.updateUser.username) {
      this.user.username = this.updateUser.username;
    }
    if (this.updateUser.password) {
      this.user.password = this.updateUser.password;
    }
    if (this.updateUser.bio) {
      this.user.bio = this.updateUser.bio;
    }
    sessionStorage.setItem('currentUser', JSON.stringify(this.user));
  }
}
