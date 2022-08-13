import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { user } from './myUser';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  regUserUrl: string = 'http://localhost:3000/api/reguser';
  authuser: string = 'http://localhost:3000/api/authuser';
  userUrl : string = 'http://localhost:3000/api/users';
  private loggedIn = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient) {}
  regUser(username: string, firstName : string, lastName : string, email : string, pw: string, role: string) {
    return this.http.post<any[]>(this.regUserUrl, {
      username: username,
      firstName : firstName,
      lastName : lastName,
      email : email,
      password: pw,
      role: role,
    });
  }
  authUser(username: string, pw: string) {
    return this.http.post<any[]>(this.authuser, {
      username: username,
      password: pw,
    });
  }
  setSecureToken(secure_token: string) {
    sessionStorage.setItem('Username', secure_token);
  }
  get isLoggedInCheck(){
    return this.loggedIn.asObservable();
  }
  getSecureToken() {
    return sessionStorage.getItem('Username');
  }
  setUserRole(role: string) {
    sessionStorage.setItem('UserRole', role);
  }
  getUserRole() {
    return sessionStorage.getItem('UserRole');
  }
  logout() {
    this.loggedIn.next(true);
    sessionStorage.removeItem('Username');
    sessionStorage.removeItem('UserRole');
    return this.getSecureToken() === null;
  }
  isLoggedIn() {
    this.loggedIn.next(true);
    return this.getSecureToken() !== null;
  }
  isAdmin() {
    return this.getUserRole() == 'admin';
  }
  isUser() {
    return this.getUserRole() == 'user' || this.getUserRole() == 'admin';
  }
  getAllUsers(){
    return this.http.get<user[]>(this.userUrl, {'responseType' : 'json'});
  }
  updateUser(_id : string, username : string){
    sessionStorage.setItem('Username', username);
    return this.http.put<user>(this.userUrl + '/' + _id, {username : username});
  }
  deleteUser(_id:string){
    sessionStorage.removeItem('Username');
    sessionStorage.removeItem('UserRole');
    return this.http.delete<user>(this.userUrl + '/' + _id);
  }
}
