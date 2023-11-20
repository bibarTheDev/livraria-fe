import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { LojaService } from './lojaService/loja.service';
import { UserService } from 'src/shared/services/userService/user.service';
@Component({
	selector: 'app-loja',
	templateUrl: './loja.component.html',
	styleUrls: ['./loja.component.scss']
})
export class LojaComponent {
    paginaSelecionada = 1;
    limitePorPagina = 6;
	like = '';
    produtos: any[] = [];
	codigo_carrinho = Number(this.userSrv.getCodCarrinho())

    constructor(
		public srv: LojaService,
		public userSrv: UserService,
		private toast: NgToastService,
		) {
		this.carregarProdutos();
    }

	carregarProdutos() {
		this.srv.getProdutos(this.paginaSelecionada, this.limitePorPagina, this.like).subscribe(
		  (response: any) => {
			this.produtos = response.data.map((produto: any) => {
			  return {
				...produto,
				imagem: `data:image/jpeg;base64,${produto.imagem}`
			  };
			});
		  },
		  (error) => {
			this.toast.error({
				detail: 'Erro ao carregar produtos',
				summary: error?.error?.message || null,
				duration: 5000
			})
			console.error(error);
		  }
		);
	  }

	onPageChange(event: any): void {
		this.paginaSelecionada = event.pageIndex + 1;
		this.limitePorPagina = event.pageSize;
		this.carregarProdutos();
	}
    atualizarQuantidade(produto: any, quantidade: number) {
        if (!produto.quantidadeSelecionada && quantidade === -1) {
            return;
        }
        produto.quantidadeSelecionada = (produto.quantidadeSelecionada || 1) + quantidade;
    }

    adicionarAoCarrinho(quantidade: number, isbn: string) {
		console.log(this.codigo_carrinho, quantidade, isbn)
		this.srv.adicionarAoCarrinho(this.codigo_carrinho, isbn, quantidade).subscribe(
			(response: any) => {
				this.toast.success({
					detail: 'Produto adicionado ao carrinho!',
					summary: 'Produto adicionado com sucesso',
					duration: 5000,
					position: 'bottomRight'
				})
				console.log(response);
			},
			(error) => {
				let summary = 'Você precisa estar logado para adicionar ao carrinho'
				if (error.statusCode === 401) {
					this.toast.error({
						detail: 'Erro ao adicionar ao carrinho',
						summary: summary,
						duration: 5000,
						position: 'bottomRight'
					})
					return;
				} else if (error.statusCode === 400) {

					if (error.error.message.includes('pago')) {
						summary = 'Este carrinho já está pago e não pode ser alterado. \n Contate o administrador em (11) 0800-0404 para mais informações.'
					}

					if (error.message.includes('quantidade')) {
						summary = 'Essa quantidade não está disponível no estoque.'
					}

					this.toast.error({
						detail: 'Erro ao adicionar ao carrinho',
						summary: summary,
						duration: 5000,
						position: 'bottomRight'
					})
				}
				this.toast.error({
					detail: 'Erro ao adicionar ao carrinho',
					summary: error?.error?.message || null,
					duration: 5000,
					position: 'bottomRight'
				})
				console.error(error);
			}
		);
    }
}
