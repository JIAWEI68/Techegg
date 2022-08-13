import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { user } from '../myUser';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
})
export class ProfilePageComponent implements OnInit {
  userList: user[] = [];
  userFilteredList: any[] = [];
  stringArray: user[] = [];
  username: string = '';
  userNameList: string[] = [];
  editProfile!: FormGroup;
  constructor(private authService: AuthService, private fb: FormBuilder, private router : Router) {}

  ngOnInit(): void {
    this.authService.getAllUsers().subscribe((data) => {
      this.userList = data.filter(
        (x) => x.username == this.authService.getSecureToken()
      );
      this.stringArray.push(this.userList[0]);
      console.log(this.userList);
      this.username = this.stringArray[0].username;
      this.userNameList.push(this.username);
      console.log(this.username);
      console.log(this.userNameList);
      console.log(this.userNameList.indexOf("as"));
      console.log(this.userNameList?.[0])
      console.log(this.stringArray);
    });
    this.editProfile = this.fb.group({
      name: this.authService.getSecureToken(),
      role: this.authService.getUserRole(),
    });
  }
  updateProfile(_id : string){
    this.authService.updateUser(_id, this.editProfile.value.name).subscribe(
      (data) => {
        console.log(data);
        location.reload();
      }
    );
  }
  deleteProfile(_id : string){
    this.router.navigateByUrl('/logout');
    this.authService.deleteUser(_id).subscribe(
      (data) => {
        console.log(data);
        location.reload();
      }
    );
  }
}
