import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  paymentList : items[] = [];
  
  name: string = '';
  private sub: any;
  newItems!: items;
  constructor(
    private route: ActivatedRoute,
    private itemsService: ItemsService,
    private paymentService: PaymentService,
    private modalService : NgbModal
  ) {}

  ngOnInit(): void {
    this.sub = this.route.params.subscribe((params) => {
      this.id = +params['id'];
      this.itemsService.getAllItems().subscribe((items) =>{
        this.items = items.find((item) => item.id === this.id);
        console.log(this.items);
      }); 
    });
  }
  addToCart() {
    this.paymentService.addPaymentToDB(this.items!.id, this.items!.name, this.items!.description,this.items!.startingPicture,this.items!.descriptionPicture,this.items!.priceRating,this.items!.sustainabilityRating,this.items!.cost,this.items!.category).subscribe((data) => {
      this.paymentList.push(data);
    });
    console.log(this.items);
  }
  openModal(){
    const modalRef = this.modalService.open(ReviewsModalContentComponent);
    modalRef.componentInstance.items = this.items;
    modalRef.componentInstance.id = this.id;
    console.log(this.items)
    console.log(reviewsList)
  }
}
