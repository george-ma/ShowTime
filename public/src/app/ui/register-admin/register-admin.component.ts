import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterAdminService } from './register-admin.service';

import { MyShow } from '../models/my_show';
import { User } from '../models/user';


@Component({
  selector: 'app-register-admin',
  templateUrl: './register-admin.component.html',
  styleUrls: ['./register-admin.component.css']
})
export class RegisterAdminComponent implements OnInit {

    // user object to bind to from
    user: any = {};

    //boolean for registration errors
    error: boolean = false;
    errorMsg: string;


    constructor(public router: Router, private registerService: RegisterAdminService) { }

    ngOnInit() {  }


    /**
     * registers a new user based on the given user credtentials bound to
     * the user object and validates them
     */
    registerAdmin() {
      this.registerService.addAdmin(this.user).subscribe((response)=>{
          sessionStorage.setItem('currentUser', JSON.stringify(response));
          this.error = false;
          this.router.navigate(['/grid']);
        },
        error => {
          this.error = true;
          this.errorMsg = error.error.message;
        }

      );
    }

  }
