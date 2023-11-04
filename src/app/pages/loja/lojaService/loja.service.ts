import { Injectable } from '@angular/core';
import { HttpService } from 'src/shared/services/httpService/http.service';

@Injectable({
  providedIn: 'root'
})
export class LojaService {

  constructor(public http: HttpService) { }

  getProdutos(){
    return this.http.get("teste")
  }
}
