import { Injectable } from '@angular/core';
import { HttpService } from 'src/shared/services/httpService/http.service';

import api from 'src/configFiles/api-adresses.json';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {

	private token = {
		'Authorization': `Bearer ${localStorage.getItem('token')}`
	}

  	constructor(public http: HttpService) { }

  	getCarrinho(){
		let url = `${api.url}${api.endpoints.carrinho}?codigo=${localStorage.getItem('codigo_carrinho')}`
		return this.http.get(url, this.token)
  	}
}
