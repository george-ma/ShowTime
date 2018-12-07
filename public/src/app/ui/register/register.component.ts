import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
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

  // user object to bind to from
  user: any = {};

  //boolean for registration errors
  error: boolean = false;
  success: boolean = false;
  errorMsg: string;


  constructor(public router: Router, private registerService: RegisterService) { }

  ngOnInit() {  }


  /**
   * registers a new user based on the given user credtentials bound to
   * the user object and validates them
   */
  registerUser() {
    this.registerService.addUser(this.user).subscribe((response)=>{
        this.error = false;
        this.success = true;
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1000);
      },
      error => {
        this.error = true
        let errormsg = ""
        if(error.error.errors.username != undefined){
          if (errormsg.length == 0){errormsg += "username is to short or already taken  \n"}
          else{errormsg += "& username is to short or already taken  \n"}
        }
        if(error.error.errors.password != undefined){
          if (errormsg.length == 0){errormsg += "password is to short  \n"}
          else{errormsg += "& password is to short  \n"}
        }
        if(error.error.errors.email != undefined){
          if (errormsg.length == 0){errormsg += "email is invalid or already taken  \n"}
          else{errormsg += "& email is invalid or already taken  \n"}
        }
        if(errormsg.length == 0){errormsg += "server error"}
        this.errorMsg = errormsg;
      }

    );
  }

}
