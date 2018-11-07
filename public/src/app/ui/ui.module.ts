import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './header/header.component';
import { GridComponent } from './grid/grid.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule }   from '@angular/forms';
import { ShowFormComponent } from './show-form/show-form.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { AccountComponent } from './account/account.component';
import { ShowComponent } from './show/show.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
  ],
  declarations: [LayoutComponent, HeaderComponent, GridComponent, LoginComponent, RegisterComponent, ShowFormComponent, AccountComponent, ShowComponent],
  exports: [LayoutComponent]
})
export class UiModule { }
