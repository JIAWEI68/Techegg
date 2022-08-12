import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { items } from '../items';
import { payment } from '../payment';
import { PaymentService } from '../payment.service';
import { paymentsList } from '../mock-payment';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';
declare let paypal: any;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  public paypalsConfig?: IPayPalConfig;
  sum: number = 0;
  count: number = 0;
  items!: items;
  addScript: boolean = false;
  paymentList: payment[] = this.paymentService.getPayments();
  finalSum: number = this.paymentService.getTotalCost(this.sum);
  paypalConfig = {
    env: 'sandbox',
    client: {
      sandbox:
        'AbgJlZm4uYCq5qpCRxkoI1G0qvgP7qSVV_VG0D-UzwceREK0URbrMbelv3sCT99tLJ37sucMkuRATPQj',
      production:
        'EFvmkDj9I3raucrJ608C-lIarphpgYqgVRgV77Y3Wvie0pwEzptD10F8cdEAyoxZ0IU_7caqFSXVtrS3',
    },
    commit: true,
    payment: (
      data: any,
      actions: {
        payment: {
          create: (arg0: {
            payment: {
              transactions: { amount: { total: number; currency: string } }[];
            };
          }) => any;
        };
      }
    ) => {
      return actions.payment.create({
        payment: {
          transactions: [{ amount: { total: this.finalSum, currency: 'SGD' } }],
        },
      });
    },
    onAuthorize: (
      data: any,
      actions: { payment: { execute: () => Promise<any> } }
    ) => {
      return actions.payment.execute().then(() => {});
    },
  };
  constructor(private paymentService: PaymentService) {}
  // ngAfterViewChecked(): void {
  //   if (!this.addScript) {
  //     this.addPayPalScript().then(() => {
  //       paypal.Button.render(this.paypalConfig, '#myPaypalBtns');
  //     });
  //   }
  // }
  // addPayPalScript() {
  //   this.addScript = true;
  //   return new Promise((resolve, reject) => {
  //     let scriptTagElement = document.createElement('script');
  //     scriptTagElement.src = 'https://www.paypalobjects.com/api/checkout.js';
  //     scriptTagElement.onload = resolve;
  //     document.body.appendChild(scriptTagElement);
  //   });
  // }

  ngOnInit(): void {
    this.paymentList = this.paymentService.getPayments();
    this.initiConfig();
  }
  delete(items: items) {
    this.paymentService.delete(items);
  }
  private initiConfig(): void {
    this.paypalsConfig = {
      currency: 'USD',
      clientId: 'sb',
      createOrderOnClient: (data) =>
        <ICreateOrderRequest>{
          intent: 'CAPTURE',
          purchase_units: [
            {
              amount: {
                currency_code: 'USD',
                value: this.finalSum.toString(),
                breakdown: {
                  item_total: {
                    currency_code: 'USD',
                    value: this.finalSum.toString()
                  },
                },
              },
              items: this.paymentList.map((item) => {
                return {
                  name: "items",
                  quantity : '1',
                  unit_amount: {
                    currency_code: 'USD',
                    value: item.cost.toString()
                  },
                };
              }),
            },
          ]
        },
        advanced : {
          commit : 'true'
        },
        style: {
          label: 'paypal',
          layout: 'vertical',
          size: 'responsive',
        },
        onApprove : (data, actions) => {
          console.log('onApprove - transaction was approved, but not authorized', data, actions);
          actions.order.get().then( (details: any) => {
            console.log('onApprove - you can get full order details inside onApprove: ', details);
            this.resetStatus();
          });
        },
        onClientAuthorization : (data) => {
          console.log('onClientAuthorization - you should probably do something with the client authorization data', data);
        },
        onCancel(data, actions) {
          console.log('OnCancel', data, actions);
        },
        onError : err => {
          console.log('OnError', err);
        },
        onClick : (data, actions) => {
          console.log('onClick', data, actions);
        }
    };
  }
  resetStatus() {
    paymentsList.splice(0, paymentsList.length);
    this.finalSum = 0 ;
  }
}
