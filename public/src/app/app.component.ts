import {
  Component
} from '@angular/core';
import {
  Show
} from './ui/models/show';
import {
  MyShow
} from './ui/models/my_show';
import {
  User
} from './ui/models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  users: Array < User > = [];

  loadDummyUsers() {
    this.users = [{
        "email": "george@gmail.com",
        "username": "george",
        "password": "hellogeorge",
        "is_admin": false,
        "is_banned": true,
        "my_shows": [{
            "id": 1,
            "review": "string",
            "rating": 5,
            "status": 2, /* Completed = 1
                            Planning = 2
                            Current = 3
                            Dropped = 4
                            Paused = 5
                         */
          },
          {
            "id": 2,
            "review": "string",
            "rating": 2,
            "status": 5,
          }
        ]
      },
      {
        "email": "nick@gmail.com",
        "username": "nick",
        "password": "hellonick",
        "is_admin": false,
        "is_banned": false,
        "my_shows": [{
          "id": 1,
          "review": "string",
          "rating": 4,
          "status": 2,
        }]
      },
      {
        "email": "bob@gmail.com",
        "username": "bob",
        "password": "hellobob",
        "is_admin": true,
        "is_banned": true,
        "my_shows": [{
            "id": 2,
            "review": "string",
            "rating": 5,
            "status": 1,
          },
          {
            "id": 1,
            "review": "string",
            "rating": 4,
            "status": 1,
          }
        ]
      },
      {
        "email": "sam@gmail.com",
        "username": "sam",
        "password": "hellosam",
        "is_admin": false,
        "is_banned": false,
        "my_shows": [{
          "id": 2,
          "review": "string",
          "rating": 5,
          "status": 1,
        }]
      },
      {
        "email": "tom@gmail.com",
        "username": "tom",
        "password": "hellotom",
        "is_admin": false,
        "is_banned": true,
        "my_shows": [{
          "id": 1,
          "review": "string",
          "rating": 5,
          "status": 1,
        }]
      },
      {
        "email": "tim@gmail.com",
        "username": "tim",
        "password": "hellotim",
        "is_admin": false,
        "is_banned": true,
        "my_shows": [{
          "id": 1,
          "review": "string",
          "rating": 5,
          "status": 4,
        }]
      },
      {
        "email": "harry@gmail.com",
        "username": "harry",
        "password": "helloharry",
        "is_admin": false,
        "is_banned": false,
        "my_shows": [
            {
            "id": 2,
            "review": "string",
            "rating": 4,
            "status": 3,
          },
          {
            "id": 1,
            "review": "string",
            "rating": 5,
            "status": 1,
          }
        ]
      },
      {
        "email": "peter@gmail.com",
        "username": "peter",
        "password": "hellopeter",
        "is_admin": false,
        "is_banned": true,
        "my_shows": [
            {
            "id": 1,
            "review": "string",
            "rating": 1,
            "status": 5,
            },
            {
            "id": 2,
            "review": "string",
            "rating": 1,
            "status": 3,
            }
        ]
      },
      {
        "email": "rick@gmail.com",
        "username": "rick",
        "password": "hellorick",
        "is_admin": false,
        "is_banned": true,
        "my_shows": [
            {
            "id": 1,
            "review": "string",
            "rating": 3,
            "status": 5,
            },
            {
            "id": 2,
            "review": "string",
            "rating": 1,
            "status": 3,
            }
        ]
      },
      {
        "email": "jimmy@gmail.com",
        "username": "jimmy",
        "password": "hellojimmy",
        "is_admin": false,
        "is_banned": true,
        "my_shows": [
            {
            "id": 2,
            "review": "string",
            "rating": 5,
            "status": 1,
            }
        ]
      },
      {
        "email": "mike@gmail.com",
        "username": "mike",
        "password": "hellomike",
        "is_admin": false,
        "is_banned": true,
        "my_shows": [
            {
            "id": 1,
            "review": "string",
            "rating": 4,
            "status": 4,
            }
        ]
      },
      {
        "email": "jane@gmail.com",
        "username": "jane",
        "password": "hellojane",
        "is_admin": true,
        "is_banned": true,
        "my_shows": [
            {
            "id": 1,
            "review": "string",
            "rating": 5,
            "status": 2,
            }
        ]
      }
    ]
  }

  shows: Array < Show > = [];

  loadDummyShows() {
    this.shows = [{
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
    sessionStorage.setItem('numShows', JSON.stringify(this.shows.length))
    sessionStorage.setItem('shows', JSON.stringify(this.shows));
    // }
    // sessionStorage.setItem('setUpData', JSON.stringify(true));

  }
}
