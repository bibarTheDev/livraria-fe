import { Component } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { CarrinhoService } from 'src/shared/services/carrinhoService/carrinho.service';

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.scss']
})
export class PagamentoComponent {

  constructor(
		private carrinhoSrv: CarrinhoService,
		private toast: NgToastService,
	) {
    // TODO: redidecionar cliente se ele nao tiver logado
		this.getCarrinho()
	}
  
  getCarrinho() {
		this.carrinhoSrv.getCarrinho().subscribe(
			(response: any) => {
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
