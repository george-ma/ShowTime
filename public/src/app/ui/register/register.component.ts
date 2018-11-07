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

  user: any = {};
  okay: string;
  error: boolean = false;
  dummyUsers: Array<User> = [];

  constructor(public router: Router, private registerService: RegisterService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(){
    this.dummyUsers = JSON.parse(sessionStorage.getItem('users'));
  }

  registerUser() {
    if(this.validatedUsername(this.user.username)){
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

  validatedUsername(username){
    for(let user of this.dummyUsers){
      if(username == user.username){
        return false;
      }
    }
    return true;
  }
}
