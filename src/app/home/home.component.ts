import { Component, OnInit, PipeTransform } from '@angular/core';
import { items } from '../items';
import { ItemsService } from '../items.service';
import { FormControl } from '@angular/forms';
import { combineLatest, Observable, of } from 'rxjs';
import { textSpanIntersectsWith } from 'typescript';
import { filter, map, startWith } from 'rxjs/operators';
import { query } from '@angular/animations';
import { FilterPipe } from './filter.pipe';
import { CategoryFilterPipe } from './category-filter.pipe';
import { PaymentService } from '../payment.service';
import { filterKeys, resultArray } from '../mock-items';

@Component({
  providers: [FilterPipe, CategoryFilterPipe],
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  itemsList = this.itemsService.getItems();
  itemsDBList: items[] = [];
  searchText: string = '';
  filterKeys = filterKeys;
  resultArray = resultArray;
  category = this.itemsService.category.toLowerCase();
  constructor(
    private itemsService: ItemsService,
    private filterPipe: FilterPipe,
    private categoryFilter: CategoryFilterPipe,
    private paymentService: PaymentService
  ) {}
  ngOnInit() {
    this.itemsService.getAllItems().subscribe((data) => {
      this.itemsDBList = data;
      console.log(this.itemsDBList) 
    });
    console.log(this.itemsDBList);
    // console.log(this.itemList)
    // this.itemList = this.itemsService.getAllItems();
    (this.itemsDBList = this.filterPipe.transform(
      this.itemsDBList,
      this.searchText
    )),
      this.categoryFilter.transform(this.itemsList, filterKeys);
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
}
