/**
 * @file
 * Component that allows admins to see all registered users,
 * and gives them the ability to modify their accounts.
 *
 */

import { Component, OnInit } from '@angular/core';
import { MyShow } from '../models/my_show';
import { User } from '../models/user';
import { AdminUserListService } from './admin-user-list.service';

@Component({
  selector: 'app-admin-user-list',
  templateUrl: './admin-user-list.component.html',
  styleUrls: ['./admin-user-list.component.css']
})
export class AdminUserListComponent implements OnInit {

  // list of users
  users: Array<User> = []

  constructor(private adminUserListService: AdminUserListService) { }

  ngOnInit() {
    this.fetchUsers();
  }

  /**
   * Promotes the input user to be an admin.
   *
   * @param {User} user
   *  User to promote to admin
   */
  promoteUser(user) {
    console.log(`Promoting ${user.username} to admin`);
    user.is_admin = true;
    this.updateUsers();
  }

  /**
   * Bans the input user.
   *
   * @param {User} user
   *  User to ban
   */
  banUser(user) {
    console.log(`Banning ${user.username}`);
    user.is_banned = true;
    this.updateUsers();
  }

  /**
   * Unbans the input user
   *
   * @param {User} user
   *  User to unban
   */
  unbanUser(user) {
    console.log(`Unbanning ${user.username}`);
    user.is_banned = false;
    this.updateUsers();
  }

  /**
   * Retrieves list of users from session storage and saves it
   * in this.users
   */
  fetchUsers() {
    this.users = JSON.parse(sessionStorage.getItem('users'));
  }

  /**
   * Modifies the user list in session storage to match this.users
   */
  updateUsers() {
    sessionStorage.setItem('users', JSON.stringify(this.users));
  }
}
