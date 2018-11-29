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

    // Fetch Users from DB
    this.adminUserListService.fetchUsers().subscribe( (response: Array<User>) => {
        this.users = response;
    }, (error) => {
        console.log(error)
    })

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
    this.adminUserListService.banUser(user).subscribe( (response: User) => {
        console.log(response)
    }, (error) => {
        console.log(error)
    })
  }

  /**
   * Bans the input user.
   *
   * @param {User} user
   *  User to ban
   */
  banUser(user) {
      console.log(`Banning user ${user.username}`);
      user.is_banned = true;
      this.adminUserListService.banUser(user).subscribe( (response: User) => {
          console.log(response)
      }, (error) => {
          console.log(error)
      })
  }

  /**
   * Unbans the input user.
   *
   * @param {User} user
   *  User to unban
   */
  unbanUser(user) {
    console.log(`Un-banning user ${user.username}`);
    user.is_banned = false;
    this.adminUserListService.banUser(user).subscribe( (response: User) => {
        console.log(response)
    }, (error) => {
        console.log(error)
    })
  }
}
