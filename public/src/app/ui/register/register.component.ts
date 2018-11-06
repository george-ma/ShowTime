import { Component, OnInit } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from './register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: any = {};
  okay: string;
  error: boolean = false;

  constructor(public router: Router, private registerService: RegisterService) { }

  ngOnInit() { }

  registerUser() {
    this.user.is_admin = false;
    sessionStorage.setItem('currentUser', JSON.stringify(this.user));
    this.registerService.addUser(this.user).subscribe((response)=>{
        this.error = false;
        console.log(response);
      },
      error => {
        this.error = true;

      }

    );
    this.router.navigate(['/grid']);
  }
}
