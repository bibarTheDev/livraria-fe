import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { CarrinhoService } from 'src/shared/services/carrinhoService/carrinho.service';

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.scss']
})
export class PagamentoComponent implements OnInit {

  carrinho: any = null;
  metodoPgto: String = "";
  metodosPgtoDisp = [
    { "valor": "cartao", "texto": "Cartão de crédito" },
    { "valor": "pix", "texto": "Pix" },
    { "valor": "boleto", "texto": "Boleto bancário" },
  ]

  constructor(
		private carrinhoSrv: CarrinhoService,
		private toast: NgToastService,
    ) { }
	
  ngOnInit(): void {
    // TODO: redidecionar cliente se ele nao tiver logado
    this.getCarrinho()
  }

  compareLivrosCarrinho(a: any[], b: any[]) {
    if (a.length != b.length){
      return false;
    }

    for (let i = 0; i < a.length; i++) {
      if (a[i].isbn != b[i].isbn){
        return false;
      }
    }

    return true;
  }

  compareCarrinho(a: any, b: any) {
    return (a.codigo == b.codigo)
      && (a.valor_total == b.valor_total)
      && this.compareLivrosCarrinho(a.itens, b.itens);
  }

  finalizaCompra() {
    // verifica se o carrinho ainda eh valido
		this.carrinhoSrv.getCarrinho().subscribe(
			(response: any) => {
        let currCarrinho = response;

        this.compareCarrinho(currCarrinho, this.carrinho)

			},
			(error) => {
        console.log("impossivel validar carrinho")
				this.toast.error({
					detail: 'Erro ao finalizar compra. Isso pode ser um erro de conexão ou você não está logado. \n Se persistir, contate o administrador em (11) 0800-0404',
					summary: error?.error?.message || null,
					duration: 5000
				})
			}
		)
	}

  getCarrinho() {
		this.carrinhoSrv.getCarrinho().subscribe(
			(response: any) => {
        this.carrinho = response
				console.log(response)
			},
			(error) => {
				this.toast.error({
					detail: 'Erro ao carregar o carrinho. Isso pode ser um erro de conexão ou você não está logado. \n Se persistir, contate o administrador em (11) 0800-0404',
					summary: error?.error?.message || null,
					duration: 5000
				})
			}
		)
	}
}
