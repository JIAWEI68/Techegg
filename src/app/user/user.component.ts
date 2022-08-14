import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { items } from '../items';
import { ItemsService } from '../items.service';
import { filterKeys, resultArray } from '../mock-items';
import { user } from '../myUser';
import { PaymentService } from '../payment.service';
import { CategoryPipe } from './category.pipe';
import { SearchPipe } from './search-pipe.pipe';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  itemsList = this.itemsService.getItems();
  itemsDBList: items[] = [];
  searchText: string = '';
  filterKeys = filterKeys;
  resultArray = resultArray;
  showDelete : boolean = true
  category = this.itemsService.category.toLowerCase();
  constructor(
    private itemsService: ItemsService,
    private searchPipe : SearchPipe,
    private categoryPipe: CategoryPipe,
    private paymentService: PaymentService,
    private authService : AuthService,
    private route : Router
  ) {}
  ngOnInit() {
    if(this.authService.getUserRole() == 'Student'){
    this.itemsService.getAllItems().subscribe((data) => {
      this.itemsDBList = data.filter((a) => a.cost <= 500);
      console.log(this.itemsDBList) 
    });}
    if(this.authService.getUserRole() == 'Teacher' || this.authService.getUserRole() == 'Admin' || this.authService.getUserRole() == 'Office Worker'){
      this.itemsService.getAllItems().subscribe((data) => {
        this.itemsDBList = data;
        console.log(this.itemsDBList) 
      });}
    console.log(this.itemsDBList);
    // console.log(this.itemList)
    // this.itemList = this.itemsService.getAllItems();
    (this.itemsDBList = this.searchPipe.transform(
      this.itemsDBList,
      this.searchText
    )),
      this.categoryPipe.transform(this.itemsList, filterKeys);
      if(this.authService.getUserRole() == "Admin"){
        this.showDelete = false
      }
      else{
        this.showDelete = true
      }
  }
  paymentList = this.paymentService.getPayments();
  onCheck(checked: boolean, $value: string) {
    console.log(checked);
    console.log(filterKeys);
    if (checked == true) {
      this.filterKeys.push($value);
      this.itemsDBList = this.itemsDBList.filter((a) =>
        filterKeys.includes(a.category)
      );
      console.log(this.itemsDBList);
    } else {
      this.filterKeys.splice(this.filterKeys.indexOf($value), 1);
      this.itemsService.getAllItems().subscribe((data) => {
        this.itemsDBList = data;
        console.log(this.itemsDBList) 
      });
    }
  }
  onDelete(id: string){
    this.itemsService.deleteItemFromDB(id).subscribe(
      (data) => {
        console.log(data);
        alert('Item Deleted');
        this.route.navigateByUrl('/users');
      }
    );
  }
  goToDetails(_id : string){
   if(this.authService.getUserRole() == "Admin"){
    this.route.navigate(['/adminEdit', _id]);
   }
   else{
    console.log(_id);
    this.route.navigate(['/items', _id]);
   }
  }

}
