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

  user: any = {};

  dummyUsers: Array<User> = [];

  error: boolean = false;

  constructor(public router: Router) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(){
    this.dummyUsers = JSON.parse(sessionStorage.getItem('users'));
  }

  loginUser(){
    for (let curUser of this.dummyUsers){
      if (this.user.username == curUser.username && this.user.password == curUser.password){
        sessionStorage.setItem('currentUser', JSON.stringify(curUser));
        this.error = false;
        this.router.navigate(['/grid'] );
      }else {
        this.error = true;
      }
    }
  }

}
