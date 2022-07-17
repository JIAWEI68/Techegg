import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { items } from '../items';
import { payment } from '../payment';
import { PaymentService } from '../payment.service';
import { render} from 'creditcardpayments/CreditCardPayments'
import { paymentsList } from '../mock-payment';
declare let paypal : any

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements AfterViewChecked {
  sum: number = 0;
  count : number = 0;
  items !: items;
  addScript : boolean = false;
  finalSum: number = this.paymentService.getTotalCost(this.sum);
  paypalConfig = {
    env : 'sandbox',
    client: {
      sandbox : 'AbgJlZm4uYCq5qpCRxkoI1G0qvgP7qSVV_VG0D-UzwceREK0URbrMbelv3sCT99tLJ37sucMkuRATPQj',
      production : 'EFvmkDj9I3raucrJ608C-lIarphpgYqgVRgV77Y3Wvie0pwEzptD10F8cdEAyoxZ0IU_7caqFSXVtrS3'
    },
    commit : true,
    payment : (data: any, actions: { payment: { create: (arg0: { payment: { transactions: { amount: { total: number; currency: string; }; }[]; }; }) => any; }; }) => {
      return actions.payment.create({
        payment: {
          transactions: [
            {amount : {total : this.finalSum, currency : 'SGD'}}
          ]
        }
      })
    },
    onAuthorize: (data: any, actions: { payment: { execute: () => Promise<any>; }; }) => {
      return actions.payment.execute().then(() => {})
    }
  }
  constructor(private paymentService: PaymentService) {
  }
  ngAfterViewChecked(): void {
    if(!this.addScript){
      this.addPayPalScript().then(()=> {
        paypal.Button.render(this.paypalConfig, '#myPaypalBtns')
      })
    }
  }
  addPayPalScript(){
    this.addScript = true;
    return new Promise((resolve, reject) => {
      let scriptTagElement = document.createElement('script');
      scriptTagElement.src = 'https://www.paypalobjects.com/api/checkout.js'
      scriptTagElement.onload = resolve;
      document.body.appendChild(scriptTagElement);
    })
  }
  
  ngOnInit(): void {
    this.paymentList = this.paymentList
  }
  delete(items: items){
    this.paymentService.delete(items);
  }
  paymentList = this.paymentService.getPayments();
 
  
}

 