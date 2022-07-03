import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ItemPageComponent } from './item-page/item-page.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ItemsService } from './items.service';
import { ItemsComponent } from './items/items.component';
import { PaymentComponent } from './payment/payment.component';

@NgModule({
  declarations: [
    AppComponent,
    ItemPageComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    ItemsComponent,
    PaymentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [ItemsService],
  bootstrap: [AppComponent, ItemPageComponent]
})
export class AppModule { }
