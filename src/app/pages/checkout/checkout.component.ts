import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';
import { Endereco } from 'src/assets/classes/endereco';
import { CarrinhoService } from 'src/shared/services/carrinhoService/carrinho.service';
import { UserService } from 'src/shared/services/userService/user.service';
import { PagamentoComponent } from '../pagamento/pagamento.component';
import { PerfilService } from '../perfil/perfilService/perfil.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  carrinho: any = null;

  endereco: Endereco | null = null;
  enderecosDisp: Endereco[] = [];

  metodoPgto: String | null = null;
  metodosPgtoDisp = [
    { "valor": "pix", "texto": "Pix" },
    // { "valor": "cartao", "texto": "Cartão de crédito" }, // desabilitados por enquanto
    // { "valor": "boleto", "texto": "Boleto bancário" },
  ]

  constructor(
    private perfilSrv: PerfilService,
		private carrinhoSrv: CarrinhoService,
    public userSrv: UserService,
		private toast: NgToastService,
    private dialog: MatDialog,
    ) { }

  ngOnInit(): void {
    // TODO: redidecionar cliente se ele nao tiver logado
    this.getCarrinho()
    this.getEnderecos()
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
    if(!(this.endereco && this.metodoPgto)){
      this.toast.error({
        detail: 'Selecione um endereço e um método de pagamento',
        duration: 5000
      })
      return;
    }

    // verifica se o carrinho ainda eh valido
		this.carrinhoSrv.getCarrinho().subscribe(
			(response: any) => {
        let currCarrinho = response;

        // verigica se nao teve alteracao no carrinho
        if(this.compareCarrinho(currCarrinho, this.carrinho)){
          this.handlePagamento()
        }
        else{
          this.toast.error({
            detail: 'Erro ao finalizar compra 😢. Isso pode ser um erro de conexão ou você não está logado ❌. \n Se persistir, contate o administrador em (11) 0800-0404 📞',
            duration: 5000
          })
        }
			},
			(error) => {
        console.log("impossivel validar carrinho")
				this.toast.error({
					detail: 'Erro ao finalizar compra 😢. Isso pode ser um erro de conexão ou você não está logado ❌. \n Se persistir, contate o administrador em (11) 0800-0404 📞',
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
					detail: 'Erro ao carregar o carrinho 😢. Isso pode ser um erro de conexão ou você não está logado ❌. \n Se persistir, contate o administrador em (11) 0800-0404 📞',
					summary: error?.error?.message || null,
					duration: 5000
				})
			}
		)
	}

  getEnderecos() {
    let cpf = this.userSrv.getCpf();

    this.perfilSrv.getUserEnderecos(cpf).subscribe(
			(response: any) => {
        this.enderecosDisp = response as unknown as Endereco[];
        console.log(this.enderecosDisp)
			},
			(error) => {
				this.toast.error({
					detail: 'Erro ao carregar enderecos 😢. Isso pode ser um erro de conexão ou você não está logado ❌. \n Se persistir, contate o administrador em (11) 0800-0404 📞',
					summary: error?.error?.message || null,
					duration: 5000
				})
			}
		)
  }

  handlePagamento() {
		const dialogRef = this.dialog.open(PagamentoComponent, {
			width: '600px',
      data: {
        'metodoPgto': this.metodoPgto,
        'endereco': this.endereco,
        'carrinho': this.carrinho,
      }
		});

		dialogRef.afterClosed().subscribe(result => {
			console.log('The dialog was closed');
		});

  }
}
