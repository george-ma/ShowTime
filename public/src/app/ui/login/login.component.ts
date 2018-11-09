import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { FormsModule }   from '@angular/forms';
import { Router } from '@angular/router';

import { MyShow } from '../models/my_show';
import { User } from '../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  // user object to bind to from
  user: any = {};

  // list of all users
  dummyUsers: Array<User> = [];

  //boolean for login errors
  error: boolean = false;

  // boolean for log banned user trying to login
  is_banned: boolean = false;

  constructor(public router: Router) { }

  ngOnInit() {
    this.getUsers();
  }

  // gets all users
  getUsers(){
    this.dummyUsers = JSON.parse(sessionStorage.getItem('users'));
  }

  // checks login credtential aginest the dummy users and checks if the user is banned.
  // if the user is banned it doesn't allow users to login.
  loginUser(){
    for (let curUser of this.dummyUsers){
      if ( (!curUser.is_banned) && this.user.username == curUser.username && this.user.password == curUser.password){
        sessionStorage.setItem('currentUser', JSON.stringify(curUser));
        this.error = false;
        this.is_banned= false;
        this.router.navigate(['/grid'] );
      }else {
        this.error = true;
        this.is_banned= curUser.is_banned;
      }
    }
  }

}
