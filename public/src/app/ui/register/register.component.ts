import { Component, OnInit } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: any = {};

  constructor(public router: Router) { }

  ngOnInit() { }

  registerUser() {
    this.user.is_admin = false;
    sessionStorage.setItem('currentUser', JSON.stringify(this.user));
    this.router.navigate(['/grid']);
  }
}
