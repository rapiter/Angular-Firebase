import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserAddComponent} from "./shared/user-add/user-add.component";
import {LoginComponent} from "./shared/login/login.component";

const routes: Routes = [
  {path: '', redirectTo: 'login', component: LoginComponent },
  {path: 'register', component: UserAddComponent},
  {path: 'login', component: LoginComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
