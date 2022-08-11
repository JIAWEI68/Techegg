import { Component, OnInit } from '@angular/core';
import { ItemsService } from './items.service';
import { items } from './items';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Techegg';
  items!: items;
  isLoggedIn!: Observable<boolean>;
  constructor(private authService: AuthService, private router : Router) {
    ItemsService.call;
  }
  ngOnInit() : void{
    // this.isLoggedIn = this.authService.isLoggedInCheck;
    if(this.authService.isLoggedIn() == true){
      document.getElementById('login')!.style.display = 'none'
    }
   else{
      (document.getElementById('logout') as HTMLElement).style.display = 'none';
    }
  } 
  goToHome(){
    this.router.navigateByUrl('/')
  }
  reloadPage() : void{
      window.location.reload();
  }
  goToHomePage(){
    if(this.authService.isLoggedIn() == true){
      this.router.navigateByUrl('/user')
    }
    else{
      this.router.navigateByUrl('/')
    }
  }
}
