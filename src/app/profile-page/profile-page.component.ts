import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
})
export class ProfilePageComponent implements OnInit {
  public userList: any[] = [];
  userFilteredList: any[] = [];
  stringArray: string[] = [];
  username : string = "as";
  editProfile!: FormGroup;
  constructor(private authService: AuthService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.authService.getAllUsers().subscribe((data) => {
      this.userList.push(
        data.filter((x) => x.username == this.authService.getSecureToken())
      );
      console.log(this.userList);
    });
   
    this.userFilteredList = this.userList
    console.log(this.userFilteredList);
    console.log(this.userList[0]);
    console.log(this.username);
    this.fb.group({
      username: '',
      role: '',
    });
  }
}
