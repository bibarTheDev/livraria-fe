import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { CarrinhoService } from '../../../shared/services/carrinhoService/carrinho.service';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.scss']
})
export class CarrinhoComponent implements OnInit {
	carrinho: any = null;

	constructor(
		public router: Router,
		public dialogRef: MatDialogRef<CarrinhoComponent>,
		private srv: CarrinhoService,
		private toast: NgToastService
	) { }

	ngOnInit(): void {
		this.getCarrinho()
	}

	onNoClick(): void {
		this.dialogRef.close();
	}

	prosseguirParaCheckout() {
		this.router.navigate(['/checkout']);
		this.dialogRef.close();
	}

	getCarrinho() {
		this.srv.getCarrinho().subscribe(
			(response: any) => {
				this.carrinho = {
					...response,
					itens: response.itens.map((produto: any) => {
						return {
							...produto,
							livro: {
								...produto.livro,
								imagem: `data:image/jpeg;base64,${produto.livro.imagem}`
							}
						};
					})
				}
			},
			(error) => {
				if (error.status != 401) {
					this.toast.error({
						detail: 'Erro ao carregar o carrinho 😢. Isso pode ser um erro de conexão ou você não está logado ❌. \n Se persistir, contate o administrador em (11) 0800-0404 📞',
						summary: error?.error?.message || null,
						duration: 5000
					})
				}
			}
		)
	}

	removerItem(isbn: string) {
		const livro = this.carrinho.itens.find((item: any) => item.livro.isbn === isbn).livro
		const quantidadeTotal = (this.carrinho.itens.find((item: any) => item.livro.isbn === isbn).quantidade || 0) * -1
		this.srv.manipularQuantidade(isbn, this.carrinho.codigo, quantidadeTotal).subscribe(
			(response: any) => {
				this.toast.success({
					detail: 'Item removido do carrinho',
					summary: `${livro.titulo} removido do carrinho! ✔`,
					duration: 5000
				})
				this.getCarrinho()
			},
			(error) => {
				this.toast.error({
					detail: 'Erro ao remover o item do carrinho 😢. Isso pode ser um erro de conexão ou você não está logado ❌. \n Se persistir, contate o administrador em (11) 0800-0404 📞',
					summary: error?.error?.message || null,
					duration: 5000
				})
			}
		)
	}

	manipularQuantidade(isbn: string, codigo_carrinho: number, quantidade: number) {
		const livro = this.carrinho.itens.find((item: any) => item.livro.isbn === isbn).livro
		this.srv.manipularQuantidade(isbn, codigo_carrinho, quantidade).subscribe(
			(response: any) => {
				this.toast.success({
					detail: 'Sucesso!',
					summary: `Quantidade de ${livro.titulo} alterada com sucesso! 😀`,
					duration: 5000
				})
				this.getCarrinho()
			},
			(error) => {
				if (error.status === 400) {
					if (error.error.message.includes('estoque')) {
						this.toast.error({
							detail: 'Erro ao adicionar ao carrinho!',
							summary: 'Essa quantidade não está disponível no estoque. 😢',
							duration: 5000
						})
						return;
					}
				}
				this.toast.error({
					detail: 'Erro ao alterar a quantidade do item no carrinho 😢. Isso pode ser um erro de conexão ou você não está logado ❌. \n Se persistir, contate o administrador em (11) 0800-0404 📞',
					summary: error?.error?.message || null,
					duration: 5000
				})
			}
		)
	}
}
