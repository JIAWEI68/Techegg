import { Component, OnInit, PipeTransform } from '@angular/core';
import { items } from '../items';
import { ItemsService } from '../items.service';
import { FormControl } from '@angular/forms';
import { combineLatest, Observable, of } from 'rxjs';
import { textSpanIntersectsWith } from 'typescript';
import { filter, map, startWith } from 'rxjs/operators';
import { query } from '@angular/animations';
import { searchList } from '../mock-items';
import { FilterPipe } from './filter.pipe';

@Component({
  providers : [FilterPipe],
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  itemsList = this.itemsService.getItems();
  searchText : string = "";
  category = this.itemsService.category.toLowerCase();
  constructor(private itemsService: ItemsService, private filterPipe : FilterPipe) {
    
    
  }
  ngOnInit() {
    this.itemsList= this.filterPipe.transform(this.itemsList, this.searchText);
  }
}

