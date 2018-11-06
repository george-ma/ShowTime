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
    this.setUser();
  }

  getCheckUser() {
    return sessionStorage.getItem('currentUser') != null;
  }

  setUser(){
    if(sessionStorage.getItem('currentUser') != null){
      this.user = JSON.parse(sessionStorage.getItem('currentUser'));
      return true;
    }
    return false;
  }

  logOut() {
    sessionStorage.removeItem('currentUser');
    this.user = null;
    this.router.navigate(['/grid'] );
  }

}
