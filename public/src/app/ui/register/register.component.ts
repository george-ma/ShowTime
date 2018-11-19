import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from './register.service';

import { MyShow } from '../models/my_show';
import { User } from '../models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // user object to bind to from
  user: any = {};

  //boolean for registration errors
  error: boolean = false;

  // list of all users
  dummyUsers: Array<User> = [];

  constructor(public router: Router, private registerService: RegisterService) { }

  ngOnInit() {
    this.getUsers();
  }

  /**
   * gets all users in the session storage
   */
  getUsers() {
    this.dummyUsers = JSON.parse(sessionStorage.getItem('users'));
  }

  /**
   * registers a new user based on the given user credtentials bound to
   * the user object and validates them
   */
  registerUser() {
    if (this.validateUsername(this.user.username) && this.validateEmail(this.user.email)) {
      this.user.is_admin = false;
      this.user.is_banned = false;
      this.user.my_shows = [];
      // sets the user to be the currently logged in user
      sessionStorage.setItem('currentUser', JSON.stringify(this.user));
      this.dummyUsers.push(this.user);
      // added the user to the global user list
      sessionStorage.setItem('users', JSON.stringify(this.dummyUsers));
      this.router.navigate(['/grid']);
    } else {
      this.error = true;
    }
    this.registerService.addUser(this.user).subscribe((response)=>{
        this.error = false;
        console.log(response);
      },
      error => {
        this.error = true;

      }

    );
    this.router.navigate(['/grid']);
  }

  /**
   * Returns ture iff the given username is not used by any other user
   *
   * @param {string} username
   * username we want to validate
   */
  validateUsername(username) {
    for (let user of this.dummyUsers) {
      if (username == user.username) {
        return false;
      }
    }
    return true;
  }

  /**
   * Returns ture iff the given email is not used by any other user
   *
   * @param {string} eamil
   * eamil we want to validate
   */
  validateEmail(email) {
    for (let user of this.dummyUsers) {
      if (email == user.email) {
        return false;
      }
    }
    return true;
  }
}
