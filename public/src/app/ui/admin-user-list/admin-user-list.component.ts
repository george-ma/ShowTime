import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-user-list',
  templateUrl: './admin-user-list.component.html',
  styleUrls: ['./admin-user-list.component.css']
})
export class AdminUserListComponent implements OnInit {

  users: Array<User> = []

  constructor() { }

  loadDummyUsers() {
    this.users = [
      {
          "email": "george@gmail.com",
          "username": "george",
          "password": "hellogeorge",
          "is_admin": false,
          "is_banned": true 
      },  
      {
          "email": "nick@gmail.com",
          "username": "nick",
          "password": "hellonick",
          "is_admin": false,
          "is_banned": false 
      },  
      {
          "email": "bob@gmail.com",
          "username": "bob",
          "password": "hellobob",
          "is_admin": true,
          "is_banned": true 
      },  
      {
          "email": "sam@gmail.com",
          "username": "sam",
          "password": "hellosam",
          "is_admin": false,
          "is_banned": false 
      },  
      {
          "email": "tom@gmail.com",
          "username": "tom",
          "password": "hellotom",
          "is_admin": false,
          "is_banned": true 
      },  
      {
          "email": "tim@gmail.com",
          "username": "tim",
          "password": "hellotim",
          "is_admin": false,
          "is_banned": true 
      },  
      {
          "email": "harry@gmail.com",
          "username": "harry",
          "password": "helloharry",
          "is_admin": false,
          "is_banned": false 
      },  
      {
          "email": "peter@gmail.com",
          "username": "peter",
          "password": "hellopeter",
          "is_admin": false,
          "is_banned": true 
      },  
      {
          "email": "rick@gmail.com",
          "username": "rick",
          "password": "hellorick",
          "is_admin": false,
          "is_banned": true 
      },  
      {
          "email": "jimmy@gmail.com",
          "username": "jimmy",
          "password": "hellojimmy",
          "is_admin": false,
          "is_banned": true 
      },  
      {
          "email": "mike@gmail.com",
          "username": "mike",
          "password": "hellomike",
          "is_admin": false,
          "is_banned": true 
      },  
      {
          "email": "jane@gmail.com",
          "username": "jane",
          "password": "hellojane",
          "is_admin": true,
          "is_banned": true 
      }
    ]
  }

  ngOnInit() {
    // dummy users
    this.loadDummyUsers();
  }

  promoteUser(user) {
    // TODO
    console.log(`TODO: promote ${user.username} to admin`)
  }

  banUser(user) {
    // TODO
    console.log(`TODO: ban ${user.username}`)
  }

  unbanUser(user) {
    // TODO
    console.log(`TODO: unban ${user.username}`)
  }

}

export class User {
  email: string;
  username: string;
  password: string;
  is_admin: boolean;
  is_banned: boolean;
}
