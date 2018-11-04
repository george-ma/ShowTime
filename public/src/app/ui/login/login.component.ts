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
    let george = {
      email: 'george@gmail.com',
      username: 'george',
      password: 'hellogeorge',
      is_admin: true

    }
    let sohail = {
      email: 'soahil@gmail.com',
      username: 'sohail',
      password: 'sohail',
      is_admin: false
    }
    this.dummyUsers.push(george);
    this.dummyUsers.push(sohail);

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
}
