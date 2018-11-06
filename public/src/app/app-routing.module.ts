import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './ui/login/login.component';
import { GridComponent } from './ui/grid/grid.component';
import { RegisterComponent } from './ui/register/register.component';
import { AdminUserListComponent } from './ui/admin-user-list/admin-user-list.component'
import { AccountComponent } from './ui/account/account.component';

const routes: Routes = [
  { path: '', component: GridComponent},
  { path: 'grid', component: GridComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'adminuserlist', component: AdminUserListComponent},
  { path: 'account', component: AccountComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
