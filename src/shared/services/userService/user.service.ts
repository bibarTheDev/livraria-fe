import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  keys = {
    'loggedUser': 'user',
    'userToken': 'userToken',
    'cpf': 'cpf',
    'codigoCarrinho': 'codigo_carrinho',
  }

  getLoggedUser() { 
    let user = localStorage.getItem(this.keys.loggedUser);
    return  user ? JSON.parse(user) : null; 
  }
  setLoggedUser(user: Object | null) { localStorage.setItem(this.keys.loggedUser, JSON.stringify(user)) }

  getUserToken() { return localStorage.getItem(this.keys.userToken) ?? ""; }
  setUserToken(token: String) { localStorage.setItem(this.keys.userToken, token.valueOf()) }

  getCpf() { return localStorage.getItem(this.keys.cpf) ?? ""; }
  setCpf(cpf: String) { localStorage.setItem(this.keys.cpf, cpf.valueOf()) }

  getCodCarrinho() { return localStorage.getItem(this.keys.codigoCarrinho) ?? ""; }
  setCodCarrinho(carr: String) { localStorage.setItem(this.keys.codigoCarrinho, carr.valueOf()) }

}
