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
  userNameList: string[] = [];
  username: string = '';
  firstName : string = '';
  lastName : string = '';
  email : string = '';
  editProfile!: FormGroup;
  imageUrl : string = "";
  constructor(private authService: AuthService, private fb: FormBuilder, private router : Router) {
  }

  ngOnInit(): void {
    this.authService.getAllUsers().subscribe((data) => {
      this.userList = data.filter(
        (x) => x.username == this.authService.getSecureToken()
      );
      this.editProfile = this.fb.group({
        name: this.authService.getSecureToken(),
        email : this.email,
        firstName : this.firstName,
        lastName : this.lastName,
        imageUrl : "",
        role: this.authService.getUserRole(),
      });
      this.stringArray.push(this.userList[0]);
      console.log(this.userList);
      this.username = this.stringArray[0].username;
      this.firstName = this.stringArray[0].firstName;
      this.lastName = this.stringArray[0].lastName;
      this.email = this.stringArray[0].email;
      this.imageUrl = this.stringArray[0].imageUrl;
      this.userNameList.push(this.username);
      console.log(this.stringArray);
      console.log(this.imageUrl)
      console.log(this)
    });
    if(this.imageUrl == ""){
      this.imageUrl = "https://img.icons8.com/small/60/undefined/user-male-circle.png"
    }
    else if(this.stringArray[0].imageUrl == undefined){
      this.imageUrl = "https://img.icons8.com/small/60/undefined/user-male-circle.png"
    }
    else{
      this.imageUrl = this.stringArray?.[0]?.imageUrl
    }
    this.username = this.userNameList?.[0]
  }
  updateProfile(_id : string){
    this.authService.updateUser(_id, this.editProfile.value.firstName, this.editProfile.value.lastName, this.editProfile.value.email, this.editProfile.value.imageUrl).subscribe(
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
