import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './ui/login/login.component';
import { GridComponent } from './ui/grid/grid.component';
import { RegisterComponent } from './ui/register/register.component';
import { ShowComponent } from './ui/show/show.component';
import { ShowFormComponent } from './ui/show-form/show-form.component';
import { AdminUserListComponent } from './ui/admin-user-list/admin-user-list.component';
import { AccountComponent } from './ui/account/account.component';
import { EditShowComponent } from './ui/edit-show/edit-show.component';

const routes: Routes = [
  { path: '', component: GridComponent},
  { path: 'grid', component: GridComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'addNewShow', component: ShowFormComponent},
  { path: 'adminuserlist', component: AdminUserListComponent},
  { path: 'account', component: AccountComponent},
  { path: 'grid/show/:id', component: ShowComponent},
  { path: 'show/:id', component: ShowComponent},
  { path: 'editShow/:id', component: EditShowComponent},
  { path: 'grid/editShow/:id', component: EditShowComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
