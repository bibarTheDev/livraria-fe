import { Injectable } from '@angular/core';
import { HttpService } from 'src/shared/services/httpService/http.service';

import api from 'src/configFiles/api-adresses.json';
import { UserService } from 'src/shared/services/userService/user.service';

@Injectable({
  providedIn: 'root'
})
export class LojaService {

	
	getAuthHeader() { return {'Authorization': `Bearer ${this.userSrv.getUserToken()}`} }

  	constructor(
		  public userSrv: UserService,
		  public http: HttpService
	){}

	getProdutos(pagina: number, limite: number, like?: string){
		let url = `${api.url}${api.endpoints.livros}?pagina=${pagina}&limite=${limite}&like=${like}`
		return this.http.get(url)
	}

	adicionarAoCarrinho(codigo_carrinho: number, isbn: string, quantidade: number){
		let url = `${api.url}${api.endpoints.carrinho}`
		return this.http.patch(url, {codigo_carrinho, isbn, quantidade}, this.getAuthHeader())
	}

	inicializarCarrinho(cpf: string){
		let url = `${api.url}${api.endpoints.carrinho}`
		return this.http.post(url, {cpf}, this.getAuthHeader())
	}
}
