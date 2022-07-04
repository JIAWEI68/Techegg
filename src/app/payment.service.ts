import { Injectable } from '@angular/core';
import { paymentsList } from './mock-payment';
import { payment } from './payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor() { }
  getPayments() : payment[]{
    return paymentsList;
  }
  addPayments(items: payment): void{
    paymentsList.push(items);
  }
}
