import api from 'src/configFiles/api-adresses.json';
import { Injectable } from '@angular/core';
import { HttpService } from 'src/shared/services/httpService/http.service';
import { UserService } from 'src/shared/services/userService/user.service';

@Injectable({
  providedIn: 'root'
})
export class RelatorioService {
	
	getAuthHeader() { return {'Authorization': `Bearer ${this.userSrv.getUserToken()}`} }

	constructor(
		public http: HttpService, 
		public userSrv: UserService
	) { }

  gerarRelatorioVendas(){
    let url = `${api.url}${api.endpoints.relatorioVenda}`;
    return this.http.get(url, this.getAuthHeader())
  }

  gerarRelatorioestoque(){
    let url = `${api.url}${api.endpoints.relatorioLivros}`;
    return this.http.get(url, this.getAuthHeader())
  }
  
  gerarRelatorioUsuarios(){
    let url = `${api.url}${api.endpoints.relatorioUsuario}`;
    return this.http.get(url, this.getAuthHeader())
  }
}
