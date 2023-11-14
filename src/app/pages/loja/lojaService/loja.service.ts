import { Injectable } from '@angular/core';
import { HttpService } from 'src/shared/services/httpService/http.service';

import api from 'src/configFiles/api-adresses.json';

@Injectable({
  providedIn: 'root'
})
export class LojaService {
	private token = {
		'Authorization': `Bearer ${localStorage.getItem('token')}`
	}

  	constructor(public http: HttpService){}

	getProdutos(pagina: number, limite: number, like?: string){
		let url = `${api.url}${api.endpoints.livros}?pagina=${pagina}&limite=${limite}&like=${like}`
		return this.http.get(url)
	}

	adicionarAoCarrinho(codigo_carrinho: number, isbn: string, quantidade: number){
		let url = `${api.url}${api.endpoints.carrinho}`
		return this.http.patch(url, {codigo_carrinho, isbn, quantidade}, this.token)
	}

	inicializarCarrinho(cpf: string){
		let url = `${api.url}${api.endpoints.carrinho}`
		return this.http.post(url, {cpf}, this.token)
	}

	getMe() {
		let url = `${api.url}${api.endpoints.me}`
		return this.http.get(url, this.token)
	}
}
