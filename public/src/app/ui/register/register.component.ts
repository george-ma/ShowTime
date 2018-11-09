import { Component, OnInit } from '@angular/core';
import { FormsModule }   from '@angular/forms';
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

  // gets all users
  getUsers(){
    this.dummyUsers = JSON.parse(sessionStorage.getItem('users'));
  }

  // takes the submit user credtentials and validates them and
  // added the new created user to the global user list
  registerUser() {
    if(this.validateUsername(this.user.username) && this.validateEmail(this.user.email)){
      this.user.is_admin = false;
      this.user.is_banned = false;
      this.user.my_shows = [];
      sessionStorage.setItem('currentUser', JSON.stringify(this.user));
      this.dummyUsers.push(this.user);
      sessionStorage.setItem('users', JSON.stringify(this.dummyUsers));
      this.router.navigate(['/grid']);
    } else{
      this.error = true;
    }
    /*this.registerService.addUser(this.user).subscribe((response)=>{
        this.error = false;
        console.log(response);
      },
      error => {
        this.error = true;

      }

    );
    this.router.navigate(['/grid']);
    */
  }

  // checks if a username is already being used
  validateUsername(username){
    for(let user of this.dummyUsers){
      if(username == user.username){
        return false;
      }
    }
    return true;
  }

  // checks if a email is already being used
  validateEmail(email){
    for(let user of this.dummyUsers){
      if(email == user.email){
        return false;
      }
    }
    return true;
  }
}
