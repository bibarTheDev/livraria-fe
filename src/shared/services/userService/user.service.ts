import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  keys = {
    'userToken': 'userToken',
    'cpf': 'cpf',
    'codigoCarrinho': 'codigo_carrinho'
  }

  getUserToken() { return localStorage.getItem(this.keys.userToken) ?? ""; }
  setUserToken(token: String) { localStorage.setItem(this.keys.userToken, token.valueOf()) }

  getCpf() { return localStorage.getItem(this.keys.cpf) ?? ""; }
  setCpf(cpf: String) { localStorage.setItem(this.keys.cpf, cpf.valueOf()) }

  getCodCarrinho() { return localStorage.getItem(this.keys.codigoCarrinho) ?? ""; }
  setCodCarrinho(carr: String) { localStorage.setItem(this.keys.codigoCarrinho, carr.valueOf()) }

}
