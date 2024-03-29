import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const permission = route.data['permission'];
    if (
      this.authService.isLoggedIn() &&
      permission.only.includes(this.authService.getUserRole())
    ) {
      return true;
    }
    else if(permission.only.includes(this.authService.getUserRole() == "Admin")){
      alert("You are not authorized to access this page");
      return false;
    } 
    else {
      console.log(
        'You had been logout, You are not authorized to access the page'
      );
      alert("You are not logged in")
      return false;
    } 
  }
}
