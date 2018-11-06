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
    if (!this.user.bio) {
      this.user.bio = "hello I am a dummy user and this is my bio";
    }
    if (!this.user.profilePic) {
      this.user.profilePic = "../../assets/profilepic.png";
    }
  }

  updateUserInfo() {
    if (this.updateUser.profilePic) {
      this.user.profilePic = this.updateUser.profilePic;
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
