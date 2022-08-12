import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';
import { ItemsComponent } from './items/items.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { PaymentComponent } from './payment/payment.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  { path: 'items/:id', component: ItemsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: RegisterComponent },
  { path: 'payment', component: PaymentComponent },
  {path: 'profile', component: ProfilePageComponent},
  {path: 'logout', component: LogoutComponent},
  {path: 'user', component: UserComponent, canActivate: [AuthGuard], data:
  {permission: {only: ["Student", "Teacher", "Office Worker", "Admin"]}}},
  {path: 'admin', component: AdminComponent, canActivate: [AuthGuard], data:
  {permission: {only: ["Admin"]}}},
  { path: '', component: HomeComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
