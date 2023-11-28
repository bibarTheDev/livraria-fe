import api from 'src/configFiles/api-adresses.json';
import { Injectable } from '@angular/core';
import { HttpService } from 'src/shared/services/httpService/http.service';
import { UserService } from 'src/shared/services/userService/user.service';

@Injectable({
  providedIn: 'root'
})
export class EstoqueService {
	
	getAuthHeader() { return {'Authorization': `Bearer ${this.userSrv.getUserToken()}`} }

	constructor(
		public http: HttpService, 
		public userSrv: UserService
	) { }

  getAutores(pagina: Number = 0, limite: Number = 100000){
    let url = `${api.url}${api.endpoints.autores}?pagina=${pagina}&limite=${limite}`;
    return this.http.get(url, this.getAuthHeader())
  }
  
  getEditoras(pagina: Number = 0, limite: Number = 100000){
    let url = `${api.url}${api.endpoints.editoras}?pagina=${pagina}&limite=${limite}`;
    return this.http.get(url, this.getAuthHeader())
  }

  cadastrarLivro(dados: any){
		let url = `${api.url}${api.endpoints.livros}`
		return this.http.post(url, dados, this.getAuthHeader())
  }
}
