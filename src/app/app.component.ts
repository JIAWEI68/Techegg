import { Component, OnInit } from '@angular/core';
import { ItemsService } from './items.service';
import { items } from './items';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Techegg';
  items!: items;
  showSignUp: boolean = false;
  showLogin: boolean = false;
  showLogout: boolean = true;
  showAdmin : boolean = true;
  isLoggedIn!: Observable<boolean>;
  constructor(private authService: AuthService, private router: Router) {
    ItemsService.call;
    this.router.events.subscribe((event) => {
      if(event instanceof NavigationEnd) {
        this.ngOnInit();
      }
    })
  }
  ngOnInit(): void {

    // this.isLoggedIn = this.authService.isLoggedInCheck;
    if (this.authService.isLoggedIn() == true) {
      this.showLogin = true;
      this.showSignUp = true;
      this.showLogout = false;
    } else {
      this.showLogin = false;
      this.showSignUp = false;
      this.showLogout = true;
    }
    if(this.authService.getUserRole() ==  'Admin'){
      this.showAdmin = false;
    }
    else{
      this.showAdmin = true;
    }
  }
  goToHome() {
    this.router.navigateByUrl('/');
  }
  reloadPage(): void {
    window.location.reload();
  }
  goToHomePage() {
    if (this.authService.isLoggedIn() == true) {
      this.router.navigateByUrl('/user');
    } else {
      this.router.navigateByUrl('/');
    }
  }
}
