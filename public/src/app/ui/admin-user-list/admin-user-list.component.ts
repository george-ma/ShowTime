import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-user-list',
  templateUrl: './admin-user-list.component.html',
  styleUrls: ['./admin-user-list.component.css']
})
export class AdminUserListComponent implements OnInit {

  users: Array<User> = []

  constructor() { }

  ngOnInit() {
    this.fetchUsers();
  }

  promoteUser(user) {
    console.log(`Promoting ${user.username} to admin`);
    user.is_admin = true;
    this.updateUsers();
  }

  banUser(user) {
    console.log(`Banning ${user.username}`);
    user.is_banned = true;
    this.updateUsers();
  }

  unbanUser(user) {
    console.log(`Unbanning ${user.username}`);
    user.is_banned = false;
    this.updateUsers();

  }

  fetchUsers() {
    this.users =  JSON.parse(sessionStorage.getItem('users'));
  }

  updateUsers() {
    sessionStorage.setItem('users', JSON.stringify(this.users));
  }

}

export class User {
  email: string;
  username: string;
  password: string;
  is_admin: boolean;
  is_banned: boolean;
}
