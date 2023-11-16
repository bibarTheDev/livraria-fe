import { Injectable } from '@angular/core';
import { HttpService } from 'src/shared/services/httpService/http.service';

import api from 'src/configFiles/api-adresses.json';
import { Login } from 'src/assets/classes/login';
import { UserService } from '../userService/user.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

	getAuthHeader() { return {'Authorization': `Bearer ${this.userSrv.getUserToken()}`} }

  constructor(
	public http: HttpService,
	public userSrv: UserService
  ){}

  login(cpf: string, senha: string) {
		let url = api.url + api.endpoints.login;
		const body = {cpf: cpf, senha: senha}
		return this.http.post(url, body);
	}

	getMe() {
		let url = `${api.url}${api.endpoints.me}`
		return this.http.get(url, this.getAuthHeader());
	}
}
