import { Component } from '@angular/core';
import { Show } from './ui/models/show';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'ShowTime';

  users: Array<User> = [];

  loadDummyUsers() {
    this.users = [
      {
          "email": "george@gmail.com",
          "username": "george",
          "password": "hellogeorge",
          "is_admin": false,
          "is_banned": true,
          "my_shows": []
      },
      {
          "email": "nick@gmail.com",
          "username": "nick",
          "password": "hellonick",
          "is_admin": false,
          "is_banned": false,
          "my_shows": []
      },
      {
          "email": "bob@gmail.com",
          "username": "bob",
          "password": "hellobob",
          "is_admin": true,
          "is_banned": true,
          "my_shows": []
      },
      {
          "email": "sam@gmail.com",
          "username": "sam",
          "password": "hellosam",
          "is_admin": false,
          "is_banned": false,
          "my_shows": []
      },
      {
          "email": "tom@gmail.com",
          "username": "tom",
          "password": "hellotom",
          "is_admin": false,
          "is_banned": true,
          "my_shows": []
      },
      {
          "email": "tim@gmail.com",
          "username": "tim",
          "password": "hellotim",
          "is_admin": false,
          "is_banned": true,
          "my_shows": []
      },
      {
          "email": "harry@gmail.com",
          "username": "harry",
          "password": "helloharry",
          "is_admin": false,
          "is_banned": false,
          "my_shows": []
      },
      {
          "email": "peter@gmail.com",
          "username": "peter",
          "password": "hellopeter",
          "is_admin": false,
          "is_banned": true,
          "my_shows": []
      },
      {
          "email": "rick@gmail.com",
          "username": "rick",
          "password": "hellorick",
          "is_admin": false,
          "is_banned": true,
          "my_shows": []
      },
      {
          "email": "jimmy@gmail.com",
          "username": "jimmy",
          "password": "hellojimmy",
          "is_admin": false,
          "is_banned": true,
          "my_shows": []
      },
      {
          "email": "mike@gmail.com",
          "username": "mike",
          "password": "hellomike",
          "is_admin": false,
          "is_banned": true,
          "my_shows": []
      },
      {
          "email": "jane@gmail.com",
          "username": "jane",
          "password": "hellojane",
          "is_admin": true,
          "is_banned": true,
          "my_shows": []
      }
    ]
  }

  shows: Array<Show> = [];

  loadDummyShows() {
    this.shows = [
      {
        id: 1,
        title: "WestWorld",
        description: "Season 1",
        link: "urlLink",
        img: "assets/ww.jpg",
        approved: true
      },
      {
        id: 2,
        title: "Riverdale",
        description: "Season 2",
        link: "urlLink",
        img: "assets/rd.jpg",
        approved: true
      },
      {
        id: 3,
        title: "Silicon Valley",
        description: "Season 3",
        link: "urlLink",
        img: "assets/sv.jpg",
        approved: false
      },
      {
        id: 4,
        title: "Better Call Saul",
        description: "Season 4",
        link: "urlLink",
        img: "assets/bcs.jpg",
        approved: false
      }
    ]
  }



  ngOnInit() {
    // if(sessionStorage.getItem('setUpData') == null){
    this.loadDummyUsers()
    sessionStorage.setItem('users', JSON.stringify(this.users));
    this.loadDummyShows()
    sessionStorage.setItem('shows', JSON.stringify(this.shows));
    // }
    sessionStorage.setItem('setUpData', JSON.stringify(true));

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
