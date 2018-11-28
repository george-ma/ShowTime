/**
 * Displays information about the current user, and shows fields
 * for changing them.
 * 
 */
import { Component, OnInit } from '@angular/core';
import { AccountService } from './account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

    /** TODO: can remove once we figure out image storing */
    // stores a local copy of the current user
    user: any = {};

    // contains the values from the user forms.
    updatedInfo: any = {};

    //boolean for registration errors
    error: boolean = false;
    errorMsg: string;

    // boolean for success
    success: boolean = false;
    successMsg: string;

    constructor(private accountService: AccountService) { }

    ngOnInit() {
        /** TODO: can remove once we figure out image storing */
        this.user = JSON.parse(sessionStorage.getItem('currentUser'));
        if (!this.user.bio) {
        this.user.bio = "hello I am a dummy user and this is my bio";
        }
        if (!this.user.profilePic) {
        this.user.profilePic = "../../assets/profilepic.png";
        }
    }

  /**
   * Updates the list of users and the current user with
   * the new information from the user forms.
   */
  updateUserInfo() {
    /** TODO: Update new display picture */

    let validEmail: boolean = true; // for email verification
    const modifiedUser = this.user;

    if (this.updatedInfo.email){
        if (this.updatedInfo.email.match("^[^@]+@[^@]+\.[^@]+$")) {
            modifiedUser.email = this.updatedInfo.email;
        } else {
            validEmail = false;
        }
    }

    if (validEmail) {
        if (this.updatedInfo.username){ modifiedUser.username = this.updatedInfo.username; }
        if (this.updatedInfo.password){ modifiedUser.password = this.updatedInfo.password; }
        if (this.updatedInfo.bio){ modifiedUser.bio = this.updatedInfo.bio; }
        
        this.accountService.editUser(modifiedUser).subscribe((response)=> {
            sessionStorage.setItem('currentUser', JSON.stringify(response));
            this.error = false;
            this.success = true;
            this.successMsg = "Changes saved."
        }, error => {
            this.error = true;
            this.errorMsg = error.error.message;
            }
        );
    } else {
        this.error = true;
        this.errorMsg = "Invalid email address.";
    }

  }
}
