import { Injectable } from '@angular/core';
import { HttpService } from 'src/shared/services/httpService/http.service';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(public http: HttpService) { }

  getProduto(){
    return this.http.get("teste")
  }
}
