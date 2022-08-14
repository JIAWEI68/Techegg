import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { items } from '../items';
import { ItemsService } from '../items.service';
import { select } from '../select';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  newItems?: items;
  addItem!: FormGroup;
  selectList: any[] = [
    'Monitor',
    'Desktop',
    'Laptop',
    'Monitor Arm',
    'Mouse',
    'Headset',
    'Pencils',
    'Pens',
    'Erasers',
    'Pencil Case',
    'Backpack',
  ];
  constructor(private itemService: ItemsService, private fb: FormBuilder, private route : Router) {}

  ngOnInit(): void {
    this.addItem = this.fb.group({
      name: '',
      description: '',
      cost: '',
      category: '',
      startPicture: '',
      descriptionPicture: '',
      priceRating: '',
      sustainabilityRating: '',
    });
  }
  onSubmit() {
    this.newItems = new items();
    this.newItems.id = 0;
    this.newItems.name = this.addItem.value.name;
    this.newItems.description = this.addItem.value.description;
    this.newItems.cost = this.addItem.value.cost;
    this.newItems.category = this.addItem.value.category;
    this.newItems.startingPicture = this.addItem.value.startPicture;
    this.newItems.descriptionPicture = this.addItem.value.descriptionPicture;
    this.newItems.priceRating = this.addItem.value.priceRating;
    this.newItems.sustainabilityRating =
      this.addItem.value.sustainabilityRating;
    this.itemService.addItem(this.newItems).subscribe(
      (data) => {
        console.log(data);
        alert('Item Added');
        this.route.navigateByUrl('/user');
      }
    );
  }

}
