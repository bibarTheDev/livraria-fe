import api from 'src/configFiles/api-adresses.json';
import { Injectable } from '@angular/core';
import { HttpService } from 'src/shared/services/httpService/http.service';
import { UserService } from 'src/shared/services/userService/user.service';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

	
	getAuthHeader() { return {'Authorization': `Bearer ${this.userSrv.getUserToken()}`} }

	constructor(
		public http: HttpService, 
		public userSrv: UserService
	) { }


  getUserData(cpf: String){
	let url = `${api.url}${api.endpoints.usuario}`.replace("$cpf", cpf.valueOf());
	return this.http.get(url, this.getAuthHeader())
  }
  
  getUserEnderecos(cpf: String){
    let url = `${api.url}${api.endpoints.usuarioEnderecos}`.replace("$cpf", cpf.valueOf());
    console.log(url)
	return this.http.get(url, this.getAuthHeader())
  }
}
