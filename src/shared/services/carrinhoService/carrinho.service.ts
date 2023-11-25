import { Injectable } from '@angular/core';
import { HttpService } from 'src/shared/services/httpService/http.service';

import api from 'src/configFiles/api-adresses.json';
import { UserService } from 'src/shared/services/userService/user.service';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {

	getAuthHeader() { return {'Authorization': `Bearer ${this.userSrv.getUserToken()}`} }

	constructor(
		public http: HttpService,
		public userSrv: UserService
	) { }

  	getCarrinho(){
		let url = `${api.url}${api.endpoints.carrinho}?codigo=${this.userSrv.getCodCarrinho()}`
		return this.http.get(url, this.getAuthHeader())
  	}

  	pagarCarrinho(metodoPgto: String){
		let url = `${api.url}${api.endpoints.carrinhoPagamento}`.replace("$codigo", this.userSrv.getCodCarrinho());
		return this.http.post(url, { 'forma_pagamento': metodoPgto }, this.getAuthHeader())
  	}

	manipularQuantidade(isbn: string, codigo_carrinho: number, quantidade: number){
		let url = `${api.url}${api.endpoints.carrinho}`
		return this.http.patch(url, {
			'codigo_carrinho': codigo_carrinho,
			'quantidade': quantidade,
			'isbn': isbn
		}, this.getAuthHeader())
	}
}
