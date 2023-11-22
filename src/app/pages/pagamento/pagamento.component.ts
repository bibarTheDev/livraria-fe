import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CarrinhoService } from 'src/shared/services/carrinhoService/carrinho.service';

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.scss']
})
export class PagamentoComponent {

  metodoPgto: any;
  endereco: any;
  carrinho: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public carrinhoSrv: CarrinhoService,
    public router: Router
  ) {
    this.metodoPgto = data.metodoPgto
    this.endereco = data.endereco
    this.carrinho = data.carrinho

    switch(this.metodoPgto){
      case 'pix':
        // TODO: gerar qrcode
        break;

      case 'cartao':
      case 'boleto':
    }
  }

  confirmarPgto() {

    console.log(this.metodoPgto);
    console.log(this.endereco);
    console.log(this.carrinho);

    this.carrinhoSrv.pagarCarrinho(this.metodoPgto).subscribe(
      (result) => {
        console.log(result)
        this.router.navigate(['/loja'])
      },
      (error) => {
        // TODO: handle this
        console.log(error)        
      }
    )
  }
}
