import { Injectable } from '@angular/core';
import api from 'src/configFiles/api-adresses.json';
import { HttpService } from '../../../../shared/services/httpService/http.service';
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
}
