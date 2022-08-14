import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { items } from '../items';
import { ItemsService } from '../items.service';

@Component({
  selector: 'app-admin-edit',
  templateUrl: './admin-edit.component.html',
  styleUrls: ['./admin-edit.component.css']
})
export class AdminEditComponent implements OnInit {
  newItems?: items;
  items?: items;
  _id : string = '0';
  editItem!: FormGroup;
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
  constructor(private itemService: ItemsService, private fb: FormBuilder, private route : Router, private aRoute : ActivatedRoute) {}

  ngOnInit(): void {
    this._id = this.aRoute.snapshot.paramMap.get('_id')!;
    console.log(this._id);
    this.itemService.getItemsById(this._id).subscribe((data) => {
      console.log(data);
      this.items = data;
      console.log(this.items);
    });
    this.editItem = this.fb.group({
      description: '',
      cost: '',
      category: '',
      priceRating: '',
      sustainabilityRating: '',
    });
  }
  onSubmit() {
    this.newItems = new items();
    this.newItems.id = this.items!.id;
    this.newItems.name = this.items!.name;
    this.newItems.description = this.editItem.value.description;
    this.newItems.cost = this.editItem.value.cost;
    this.newItems.category = this.editItem.value.category;
    this.newItems.startingPicture = this.items!.startingPicture;
    this.newItems.descriptionPicture = this.items!.descriptionPicture;
    this.newItems.priceRating = this.editItem.value.priceRating;
    this.newItems.sustainabilityRating =
      this.editItem.value.sustainabilityRating;
    this.itemService.editItem(this._id, this.newItems).subscribe(
      (data) => {
        console.log(data);
        alert('Item Edited');
        this.route.navigateByUrl('/user');
      }
    );
  }

}
