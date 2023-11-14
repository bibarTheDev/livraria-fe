import { Injectable } from '@angular/core';
import { HttpService } from 'src/shared/services/httpService/http.service';

import api from 'src/configFiles/api-adresses.json';
import { Login } from 'src/assets/classes/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(public http: HttpService){}

  login(cpf: string, senha: string) {
		let url = api.url + api.endpoints.login;
		const body = {cpf: cpf, senha: senha}
		console.log(`service`)
		console.log(typeof(cpf), typeof(senha))
		return this.http.post(url, body);
	}

	getMe() {
		let url = `${api.url}${api.endpoints.me}`
		return this.http.get(url)
	}
}
