import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../auth.service';
import { items } from '../items';
import { ItemsService } from '../items.service';
import { itemsList } from '../mock-items';
import { paymentsList } from '../mock-payment';
import { reviewsList } from '../mock-reviews';
import { payment } from '../payment';
import { PaymentService } from '../payment.service';
import { ReviewsModalContainerComponent } from '../reviews-modal-container/reviews-modal-container.component';
import { ReviewsModalContentComponent } from '../reviews-modal-content/reviews-modal-content.component';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css'],
})
export class ItemsComponent implements OnInit {
  items?: items;
  newPayment?: payment;
  id: number = 0;
  _id: string = '0';
  paymentList: items[] = [];

  name: string = '';
  private sub: any;
  newItems!: items;
  constructor(
    private route: ActivatedRoute,
    private itemsService: ItemsService,
    private paymentService: PaymentService,
    private modalService: NgbModal,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this._id = this.route.snapshot.paramMap.get('_id')!;
    console.log(this._id);
    this.itemsService.getItemsById(this._id).subscribe((data) => {
      console.log(data);
      this.items = data;
      console.log(this.items);
    });
  }
  addToCart() {
    if (this.authService.isLoggedIn()) {
      this.paymentService
        .addPaymentToDB(
          this.items!.id,
          this.items!.name,
          this.items!.description,
          this.items!.startingPicture,
          this.items!.descriptionPicture,
          this.items!.priceRating,
          this.items!.sustainabilityRating,
          this.items!.cost,
          this.items!.category
        )
        .subscribe((data) => {
          this.paymentList.push(data);
        });
      console.log(this.items);
    } else {
      alert('You must be logged in to add to cart');
    }
  }
  openModal() {
    const modalRef = this.modalService.open(ReviewsModalContentComponent);
    modalRef.componentInstance.items = this.items;
    modalRef.componentInstance._id = this.items?._id;
    console.log(this.items);
    console.log(reviewsList);
  }
}
