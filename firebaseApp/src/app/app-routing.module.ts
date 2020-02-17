import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserProfileComponent} from "./user-profile/user-profile.component";
import {UserAddComponent} from "./user-add/user-add.component";
import {MainpageComponent} from "./mainpage/mainpage.component";
import {LoginComponent} from "./login/login.component";


const routes: Routes = [{
  path: '', component: MainpageComponent, pathMatch: 'full'},
  {path: 'profile', component: UserProfileComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: UserAddComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
