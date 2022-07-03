import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemsService } from '../items.service';

@Component({
  selector: 'item-page',
  templateUrl: './item-page.component.html',
  styleUrls: ['./item-page.component.css'],
})
export class ItemPageComponent implements OnInit {
  itemsService!: ItemsService;
  id!: number;
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
  }
  //get the items based on the index of id
  itemsList = this.itemsService.getItemId(this.id);
}
