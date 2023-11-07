import { Injectable } from '@angular/core';
import { HttpService } from 'src/shared/services/httpService/http.service';

import api from 'src/configFiles/api-adresses.json'

@Injectable({
  providedIn: 'root'
})
export class LojaService {

  constructor(public http: HttpService) 
  {
    
  }

  getProdutos(){
    let url = api.url + api.endpoints.livros;
    return this.http.get(url)
  }
}
