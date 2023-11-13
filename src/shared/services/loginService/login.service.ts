import { Injectable } from '@angular/core';
import { HttpService } from 'src/shared/services/httpService/http.service';

import api from 'src/configFiles/api-adresses.json';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(public http: HttpService){}

	getMe() {
		let url = `${api.url}${api.endpoints.me}`
		return this.http.get(url)
	}
}
