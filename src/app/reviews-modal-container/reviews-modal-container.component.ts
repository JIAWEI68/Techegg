import { Component, OnInit } from '@angular/core';
import { ReviewsModalContentComponent } from '../reviews-modal-content/reviews-modal-content.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ItemsService } from '../items.service';
import { items } from '../items';
import { AddReviewModalContentComponent } from '../add-review-modal-content/add-review-modal-content.component';

@Component({
  selector: 'app-reviews-modal-container',
  templateUrl: './reviews-modal-container.component.html',
  styleUrls: ['./reviews-modal-container.component.css']
})
export class ReviewsModalContainerComponent implements OnInit {
  items = items;
  constructor(private modalService : NgbModal, private itemsService : ItemsService) { }

  ngOnInit(): void {
  }
  openModal(){
    const modalRef = this.modalService.open(AddReviewModalContentComponent);
    modalRef.componentInstance.items = this.items;
    console.log(this.items)
  }


}
