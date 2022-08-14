import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../items.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private itemService : ItemsService) { }

  ngOnInit(): void {
  }

}
