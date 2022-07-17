import { Injectable } from '@angular/core';
import { items } from './items';
import { paymentsList } from './mock-payment';
import { payment } from './payment';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor() {}
  getPayments(): payment[] {
    return paymentsList;
  }
  addPayments(items: items): void {
    paymentsList.push(items);
  }
  getTotalCost(sum: number) {
    console.log(sum);
    paymentsList.forEach((a) => (sum += a.cost));
    return sum;
  }
  delete(items : items): payment[] {
    paymentsList.forEach((value) => {
      if ((value === items)) paymentsList.splice(0, 1);
    });
    return paymentsList;
  }
}
