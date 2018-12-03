import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from './header.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user: any = {}

  constructor(public router: Router, private headerService: HeaderService) { }

  ngOnInit() {
    this.setUser();
    this.headerService.getSessionUser().subscribe((response)=>{
      sessionStorage.setItem('currentUser', JSON.stringify(response));
    }, (error) => {
      sessionStorage.removeItem('currentUser');
    });
  }

  getCheckUser() {
    return sessionStorage.getItem('currentUser') != null;
  }

  setUser() {
    if (sessionStorage.getItem('currentUser') != null) {
      this.user = JSON.parse(sessionStorage.getItem('currentUser'));
      return true;
    }
    return false;
  }

  logOut() {
    this.headerService.logout().subscribe((response)=>{
      this.user = null;
      sessionStorage.removeItem('currentUser');
    }, (error) => {
      sessionStorage.removeItem('currentUser');
    });

  }

}
