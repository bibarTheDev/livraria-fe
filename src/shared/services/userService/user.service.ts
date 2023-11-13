import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  keys = {
    'userToken': 'userToken'
  }

  getUserToken() { return localStorage.getItem(this.keys.userToken) ?? ""; }
  setUserToken(token: String) { localStorage.setItem(this.keys.userToken, token.valueOf()) }

}
