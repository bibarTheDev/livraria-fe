import { Injectable } from '@angular/core';
import { HttpService } from 'src/shared/services/httpService/http.service';

import api from 'src/configFiles/api-adresses.json'
import { Cadastro } from 'src/assets/classes/cadastro';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {

  constructor(public http: HttpService) 
  {
    
  }

  cadastrarUsuario(dados: Cadastro)
  {
    let url = api.url + api.endpoints.usuarioCadastro; 
    // let headers = {'Content-Type':'application/json'}

    return this.http.post(url, dados/*, headers*/);
  }
}
