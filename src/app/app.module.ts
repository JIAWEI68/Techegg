import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ItemsService } from './items.service';
import { ItemsComponent } from './items/items.component';
import { PaymentComponent } from './payment/payment.component';
import { PaymentService } from './payment.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterPipe } from './home/filter.pipe';
import { ReviewsModalContainerComponent } from './reviews-modal-container/reviews-modal-container.component';
import { ReviewsModalContentComponent } from './reviews-modal-content/reviews-modal-content.component';
import { ReviewsService } from './reviews.service';
import { AddReviewsModalComponent } from './add-reviews-modal-container/add-reviews-modal.component';
import { AddReviewModalContentComponent } from './add-review-modal-content/add-review-modal-content.component';
import { NameCheckerPipe } from './reviews-modal-content/name-checker.pipe';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';
import { CategoryFilterPipe } from './home/category-filter.pipe';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    ItemsComponent,
    PaymentComponent,
    FilterPipe,
    ReviewsModalContainerComponent,
    ReviewsModalContentComponent,
    AddReviewsModalComponent,
    AddReviewModalContentComponent,
    NameCheckerPipe,
    CategoryFilterPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatCheckboxModule,
  ],
  providers: [
    ItemsService,
    PaymentService,
    FilterPipe,
    ReviewsService,
    NameCheckerPipe,
    CategoryFilterPipe,
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ReviewsModalContainerComponent,
    AddReviewModalContentComponent,
  ],
})
export class AppModule {}
