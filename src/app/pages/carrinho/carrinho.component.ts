import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CarrinhoService } from '../../../shared/services/carrinhoService/carrinho.service';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.scss']
})
export class CarrinhoComponent {
	carrinho: any = null;

	constructor(
		public router: Router,
		public dialogRef: MatDialogRef<CarrinhoComponent>,
		private srv: CarrinhoService,
		private toast: NgToastService,
	) {
		this.getCarrinho()
	}

	onNoClick(): void {
		this.dialogRef.close();
	}

	prosseguirParaPagamento() {
		this.router.navigate(['/pagamento']);
		this.dialogRef.close();
	}

	getCarrinho() {
		this.srv.getCarrinho().subscribe(
			(response: any) => {
				this.carrinho = response
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
