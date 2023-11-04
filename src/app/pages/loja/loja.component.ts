import { Component } from '@angular/core';
import { LojaService } from './lojaService/loja.service';

@Component({
  selector: 'app-loja',
  templateUrl: './loja.component.html',
  styleUrls: ['./loja.component.scss']
})
export class LojaComponent {

  constructor(public srv: LojaService){
    console.log(srv.getProdutos())
  }
}
