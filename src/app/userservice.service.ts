import { Injectable } from '@angular/core';
import { myUser } from './myUser';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

  private listOfUsers: myUser[] = [
    {

    }
  ]

  constructor() { }

  getUsers() : myUser[] {
    return this.listOfUsers;
  }

  addUser(item: myUser) : void{
    this.listOfUsers.push(item);
  }

}
