import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  user: any = {};
  updateUser: any = {};

  constructor() { }

  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem('currentUser'));
    this.user.bio = "hello I am a dummy user and this is my bio";
  }

  updateUserInfo() {
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
