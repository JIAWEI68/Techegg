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
  paymentListDB: items[] = [];
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
    this.paymentService.getAllPayment().subscribe((data) => {
      this.paymentListDB = data;
      console.log(this.paymentListDB);
      this.paymentListDB.forEach((item) => {
        this.finalSum += item.cost;
      } );
    } );
    this.initiConfig();
  }
  // delete(items: items) {
  //   this.paymentService.delete(items);
  // }
  private initiConfig(): void {
    this.paypalsConfig = {
      currency: 'SGD',
      clientId: 'sb',
      createOrderOnClient: (data) =>
        <ICreateOrderRequest>{
          intent: 'CAPTURE',
          purchase_units: [
            {
              amount: {
                currency_code: 'SGD',
                value: this.finalSum.toString(),
                breakdown: {
                  item_total: {
                    currency_code: 'SGD',
                    value: this.finalSum.toString()
                  },
                },
              },
              items: this.paymentListDB.map((item) => {
                return {
                  name: "items",
                  quantity : '1',
                  unit_amount: {
                    currency_code: 'SGD',
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
          size: 'responsive'
        },
        onApprove : (data, actions) => {
          console.log('onApprove - transaction was approved, but not authorized', data, actions);
          actions.order.get().then( (details: any) => {
            console.log('onApprove - you can get full order details inside onApprove: ', details);
            this.resetStatus();
            location.reload();
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
    this.paymentService.deleteAllPaymentFromDB().subscribe((data) => {
      console.log(this.paymentListDB);})
    paymentsList.splice(0, paymentsList.length);
    this.finalSum = 0 ;
  }
  deleteItem(id: string){
    this.paymentService.deletePaymentFromDB(id).subscribe((data) => {
      this.paymentListDB.splice(this.paymentListDB.indexOf(data), 1);
      this.paymentListDB.forEach((item) => {
        this.finalSum -= item.cost;
      } );
      location.reload();
    });
  }
}
