import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "./shared/services/auth/auth.service";
import {map, take, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CanReadGuard implements CanActivate {
  constructor(private auth: AuthService) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.auth.user$.pipe(
      take(1),
      map(user => user && this.auth.canRead(user) ? true : false),
      tap(canView => {
        if(!canView){
          console.error('ACCESS DENIED')
        }
      })
    )
  }
}
