import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { items } from '../items';
import { ItemsService } from '../items.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
