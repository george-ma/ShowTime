import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user: any = {}

  constructor(public router: Router) { }

  ngOnInit() {


  }

  getCheckUser() {
    return sessionStorage.getItem('currentUser') != null;
  }

  setUser(){
    if(sessionStorage.getItem('currentUser') != null){
      this.user = JSON.parse(sessionStorage.getItem('currentUser'));
      return true;
    }
    console.log(this.user);
    return false;

  }


}
