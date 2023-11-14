import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { CarrinhoComponent } from '../carrinho/carrinho.component';
import { LoginComponent } from '../login/login.component';
import { LojaService } from './lojaService/loja.service';
import { UserService } from 'src/shared/services/userService/user.service';
@Component({
	selector: 'app-loja',
	templateUrl: './loja.component.html',
	styleUrls: ['./loja.component.scss']
})
export class LojaComponent {
    paginaSelecionada = 0;
    limitePorPagina = 6;
	like = '';
    produtos: any[] = [];
	codigo_carrinho = 0;

    constructor(
		public srv: LojaService,
		public userSrv: UserService,
		private toast: NgToastService,
		private dialog: MatDialog,
		private router: Router
		) {
		this.carregarProdutos();
		this.obterCarrinho();
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

	obterCarrinho() {
		let cpf = this.userSrv.getCpf(); 

		if (cpf) {
			this.srv.inicializarCarrinho(cpf).subscribe(
				(response: any) => {
					this.codigo_carrinho = response.codigo;
					this.userSrv.setCodCarrinho(response.codigo);
				},
				(error) => {
					this.toast.error({
						detail: 'Erro ao obter carrinho. Isso pode ser um erro de conexão ou você não está logado. \n Se persistir, contate o administrador em (11) 0800-0404',
						summary: error?.error?.message || null,
						duration: 5000,
						position: 'bottomRight'
					})
					console.error(error);
				}
			);
		}
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

	handleCarrinho() {
		//TODO: IMPLEMENTAR TELA DE CARRINHO
		const dialogRef = this.dialog.open(CarrinhoComponent, {
			width: '600px'
		});

		dialogRef.afterClosed().subscribe(result => {
			console.log('The dialog was closed');
		});
	}

	abrirModalLogin() {
		const dialogRef = this.dialog.open(LoginComponent, {
			width: '400px'
		});

		dialogRef.afterClosed().subscribe(result => {
			console.log('The dialog was closed');
		});
		this.obterCarrinho()
	}

	goToLoja(): void {
		this.like = ''; // Resetar o campo de pesquisa
		this.paginaSelecionada = 0; // Resetar a página
		this.carregarProdutos() // Carregar os produtos novamente
		this.router.navigate(['/loja']); // Navegar para a página da loja
	}
}
