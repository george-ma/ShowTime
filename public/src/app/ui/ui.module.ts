import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './header/header.component';
import { GridComponent } from './grid/grid.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule }   from '@angular/forms';
import { AccountComponent } from './account/account.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
  ],
  declarations: [LayoutComponent, HeaderComponent, GridComponent, LoginComponent, RegisterComponent, AccountComponent],
  exports: [LayoutComponent]
})
export class UiModule { }
