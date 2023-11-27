import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
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
	public dialogRef: MatDialogRef<PagamentoComponent>,
    public router: Router,
	private toast: NgToastService,
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

  onNoClick(): void {
	this.dialogRef.close();
}

  confirmarPgto() {

    console.log(this.metodoPgto);
    console.log(this.endereco);
    console.log(this.carrinho);

    this.carrinhoSrv.pagarCarrinho(this.metodoPgto).subscribe(
      (result) => {
        console.log(result)
		this.dialogRef.close();
        this.router.navigate(['/loja'])
		this.toast.success({
            detail: 'Compra finalizada com sucesso! 🎉 Obrigado pela preferência e aproveite seus livros! 😀',
            duration: 5000
          })
      },
      (error) => {
		this.toast.error({
            detail: 'Erro ao finalizar compra 😢. Isso pode ser um erro de conexão ou você não está logado ❌. \n Se persistir, contate o administrador em (11) 0800-0404 📞',
            duration: 5000
          })
      }
    )
  }
}
