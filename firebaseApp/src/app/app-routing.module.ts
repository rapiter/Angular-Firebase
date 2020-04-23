import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserProfileComponent} from "./user-profile/user-profile.component";
import {MainpageComponent} from "./mainpage/mainpage.component";
import {AdminGuard} from "./authentication/admin.guard";
import {CanReadGuard} from "./authentication/can-read.guard";
import {ControlpanelComponent} from "./controlpanel/controlpanel.component";
import {UserEditComponent} from "./user-edit/user-edit.component";
import {ProductListComponent} from "./product/product-list/product-list.component";
import {ProductAddComponent} from "./product/product-add/product-add.component";
import {ProductEditComponent} from "./product/product-edit/product-edit.component";

const routes: Routes = [{
  path: '', component: MainpageComponent, pathMatch: 'full'},
  {path: 'cp', component: ControlpanelComponent, canActivate: [AdminGuard]},
  {path: 'profile', component: UserProfileComponent, canActivate: [CanReadGuard]},
  {path: 'profile-edit', component: UserEditComponent, canActivate: [CanReadGuard]},
  {path: 'products', component: ProductListComponent},
  {path: 'product-add', component: ProductAddComponent, canActivate: [CanReadGuard]},
  {path: 'product-edit', component: ProductEditComponent, canActivate: [CanReadGuard]},



  { path: 'authentication', loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
