import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CarrinhoService } from './carrinhoService/carrinho.service';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.scss']
})
export class CarrinhoComponent {
	produtos: any[] = [];

	constructor(
		public dialogRef: MatDialogRef<CarrinhoComponent>,
		private srv: CarrinhoService
	) {
		this.getCarrinho()
	}

	onNoClick(): void {
		this.dialogRef.close();
	}

	prosseguirParaPagamento() {
		// TODO: REDIRECIONAR PARA TELA DE PAGAMENTO
		throw new Error('Method not implemented.');
	}

	getCarrinho() {
		this.srv.getCarrinho().subscribe(
			(response: any) => {
				console.log(response)
			},
			(error) => {
				console.error(error)
			}
		)
	}
}
