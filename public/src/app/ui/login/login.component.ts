import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { FormsModule }   from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  user: any = {};

  dummyUsers: Array<User> = [];

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
        this.router.navigate(['/grid'] );
      }
    }
  }

}

export class User {
  email: string;
  username: string;
  password: string;
  is_admin: boolean;
  is_banned: boolean;
  my_shows: Array<number>;
}
