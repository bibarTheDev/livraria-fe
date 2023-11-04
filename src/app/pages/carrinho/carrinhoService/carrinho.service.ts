import { Injectable } from '@angular/core';
import { HttpService } from 'src/shared/services/httpService/http.service';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {

  constructor(public http: HttpService) { }

  getCarrinho(){
    return this.http.get("teste")
  }
}
