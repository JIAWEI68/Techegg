import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { items } from '../items';
import { ItemsService } from '../items.service';
import { itemsList } from '../mock-items';
import { paymentsList } from '../mock-payment';
import { payment } from '../payment';
import { PaymentService } from '../payment.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css'],
})
export class ItemsComponent implements OnInit {
  items?: items;
  newPayment ?: payment;
  id: number = 0;
  private sub: any;
  constructor(
    private route: ActivatedRoute,
    private itemsService: ItemsService,
    private paymentService : PaymentService
  ) {}

  ngOnInit(): void {
    this.sub = this.route.params.subscribe((params) => {
      this.id = +params['id'];
      this.items = this.itemsService.getItemId(this.id);
    });
  }
  addToCart(){
    this.newPayment = new payment();
    this.newPayment.id = this.id;
    this.newPayment.name = items.name;
    this.newPayment.cost = items.cost;
    this.newPayment.startingPicture = items.startingPicture
    this.paymentService.addPayments(this.newPayment);
    console.log(paymentsList);
  }

}
