import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './ui/login/login.component';
import { GridComponent } from './ui/grid/grid.component';
import { RegisterComponent } from './ui/register/register.component';
import { ShowFormComponent } from './ui/show-form/show-form.component';

const routes: Routes = [
  { path: '', component: GridComponent},
  { path: 'grid', component: GridComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'addNewShow', component: ShowFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
