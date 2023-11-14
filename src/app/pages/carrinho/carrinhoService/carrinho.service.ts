import { Injectable } from '@angular/core';
import { HttpService } from 'src/shared/services/httpService/http.service';

import api from 'src/configFiles/api-adresses.json';
import { UserService } from 'src/shared/services/userService/user.service';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {

	private token = {
		'Authorization': `Bearer ${this.userSrv.getUserToken()}`
	}

  	constructor(
		public http: HttpService, 
		public userSrv: UserService
	) { }

  	getCarrinho(){
		let url = `${api.url}${api.endpoints.carrinho}?codigo=${this.userSrv.getCodCarrinho()}`
		return this.http.get(url, this.token)
  	}
}
