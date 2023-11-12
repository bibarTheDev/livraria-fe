import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';
import { LoginComponent } from '../login/login.component';
import { LojaService } from './lojaService/loja.service';
@Component({
	selector: 'app-loja',
	templateUrl: './loja.component.html',
	styleUrls: ['./loja.component.scss']
})
export class LojaComponent {
    paginaSelecionada = 1;
    limitePorPagina = 6;
    produtos: any[] = []; // Array para armazenar os produtos

    constructor(public srv: LojaService, private toast: NgToastService, private dialog: MatDialog) {
		this.carregarProdutos(this.paginaSelecionada, this.limitePorPagina);
    }

	carregarProdutos(pagina: number, limite: number) {
		this.srv.getProdutos(pagina, limite).subscribe(
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
				summary: error.message,
				duration: 5000
			})
			console.error(error);
		  }
		);
	  }


    atualizarQuantidade(produto: any, quantidade: number) {
        if (!produto.quantidadeSelecionada && quantidade === -1) {
            return; // Não permita quantidade negativa
        }
        produto.quantidadeSelecionada = (produto.quantidadeSelecionada || 1) + quantidade;
    }

    adicionarAoCarrinho(codigo_carrinho: number, quantidade: number, isbn: string) {
		// ainda não adiciona ao carrinho pq não existe login
		console.log(codigo_carrinho, quantidade, isbn)
		this.srv.adicionarAoCarrinho(codigo_carrinho, isbn, quantidade).subscribe(
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
				if (error.status === 401) {
					this.toast.error({
						detail: 'Erro ao adicionar ao carrinho',
						summary: 'Você precisa estar logado para adicionar ao carrinho',
						duration: 5000,
						position: 'bottomRight'
					})
					return;
				} else if (error.status === 400) {
					this.toast.error({
						detail: 'Erro ao adicionar ao carrinho',
						summary: 'Essa quantidade não está disponível no estoque',
						duration: 5000,
						position: 'bottomRight'
					})
					return;
				}
				this.toast.error({
					detail: 'Erro ao adicionar ao carrinho',
					summary: error.message,
					duration: 5000,
					position: 'bottomRight'
				})
				console.error(error);
			}
		);
    }

	handleConta() {
		this.srv.getMe().subscribe(
			(response: any) => {
				console.log(`exibir tela de conta`)
			},
			(error) => {
				console.log(`abrir modal de login`)
				this.abrirModalLogin();
			}
		)
	}

	abrirModalLogin() {
		const dialogRef = this.dialog.open(LoginComponent, {
			width: '400px'
			// outros configs
		});

		dialogRef.afterClosed().subscribe(result => {
			console.log('The dialog was closed');
		});
	}
}
