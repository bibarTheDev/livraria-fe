import { Injectable } from '@angular/core';
import { HttpService } from 'src/shared/services/httpService/http.service';

import api from 'src/configFiles/api-adresses.json';
import { Login } from 'src/assets/classes/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(public http: HttpService){}

	login(dados: Login) {
		let url = `${api.url}${api.endpoints.login}`
		let headers = {'Content-Type':'application/json'}

		return this.http.post(url, JSON.stringify(dados), headers)
	}

	getMe() {
		let url = `${api.url}${api.endpoints.me}`
		return this.http.get(url)
	}
}
