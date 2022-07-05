import { Injectable } from '@angular/core';
import { items } from './items';
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
  addPayments(items: items): void{
    paymentsList.push(items);
  }
}
