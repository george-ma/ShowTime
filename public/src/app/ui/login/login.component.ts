import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { FormsModule }   from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: any = {};

  constructor() { }

  ngOnInit() {
  }

}
