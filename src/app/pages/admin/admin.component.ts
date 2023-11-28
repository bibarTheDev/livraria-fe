import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Observable } from 'rxjs';
import { Usuario } from 'src/assets/classes/usuario';
import { UserService } from 'src/shared/services/userService/user.service';
import { PerfilService } from '../perfil/perfilService/perfil.service';
import { EstoqueService } from './estoqueService/estoque.service';
import { RelatorioService } from './relatorioService/relatorio.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {

	livroForm: FormGroup;
  dadosAutores: any[] = [];
  dadosEditoras: any[] = [];

  autorSelected: any | "new";
  editoraSelected: any | "new";

  constructor (
		public userSrv: UserService,
    public relatorioSrv: RelatorioService,
    public estoqueSrv: EstoqueService,
    public perfilSrv: PerfilService,
    public router: Router,
		private formBuilder: FormBuilder,
    private toast: NgToastService
  ) {

    // checa se eh um usuario valido
    let user = userSrv.getLoggedUser();

    if(user){
      perfilSrv.getUserData(user.cpf).subscribe(
        (response) => {
          let userData = response as unknown as Usuario;
          console.log(userData);

          if(!userData.admin){
			this.toast.error({
				detail: 'Não permitido!',
				summary: 'Você não tem permissão para acessar essa página 😢',
				duration: 5000
			})
            this.returnToLoja();
          }
        },
        (error) => {
          // TODO: error
          console.log(error);
		  this.toast.error({
			detail: 'Erro ao obter dados do usuário 😢. Isso pode ser um erro de conexão ou você não está logado ❌. \n Se persistir, contate o administrador em (11) 0800-0404 📞',
			summary: error?.error?.message || null,
			duration: 5000
			})
          this.returnToLoja();
        }
      );
    }
    else{
      this.returnToLoja();
    }


    // carrega dados de autores e editoras
    this.carregarDadosAutoresEditoras()

    // cria form do livro
    this.livroForm = this.formBuilder.group({
      isbn: [, { validators: [Validators.required] }],
      nome: [, { validators: [Validators.required] }],
      valor: [, { validators: [Validators.required] }],
      autor: [, { validators: [Validators.required] }],
      nome_autor: [,],
      email_autor: [,],
      editora: [, { validators: [Validators.required] }],
      cnpj_editora: [,],
      nome_editora: [,],
      email_editora: [,],
      telefone_editora: [,],
      sku: [, { validators: [Validators.required] }],
      quantidade: [, { validators: [Validators.required] }],
    });
  }

  carregarDadosAutoresEditoras() {
    this.estoqueSrv.getAutores().subscribe(
    (response: any) => {
      console.log(response);
      this.dadosAutores = response.data as any[]
    },
    (error) => {
      // TODO: error
      console.log(error);
	  this.toast.error({
		detail: 'Erro ao obter dados de autores disponíveis 😢. Isso pode ser um erro de conexão ou você não está logado ❌. \n Se persistir, contate o administrador em (11) 0800-0404 📞',
		summary: error?.error?.message || null,
		duration: 5000
	})
    });

    this.estoqueSrv.getEditoras().subscribe(
      (response: any) => {
        console.log(response);
        this.dadosEditoras = response.data as any[]
    },
    (error) => {
      // TODO: error
      console.log(error);
	  this.toast.error({
		detail: 'Erro ao obter dados de editoras disponíveis 😢. Isso pode ser um erro de conexão ou você não está logado ❌. \n Se persistir, contate o administrador em (11) 0800-0404 📞',
		summary: error?.error?.message || null,
		duration: 5000
	})
    });

  }

  cadastrarLivro() {
    let autor = (this.autorSelected != 'new')
    ? this.livroForm.get('autor')?.value
    : {
      "nome": this.livroForm.get('nome_autor')?.value,
      "email": this.livroForm.get('email_autor')?.value,
    }

    let editora = (this.editoraSelected != 'new')
      ? this.livroForm.get('editora')?.value
      : {
        "cnpj": this.livroForm.get('cnpj_editora')?.value,
        "nome": this.livroForm.get('nome_editora')?.value,
        "email": this.livroForm.get('email_editora')?.value,
        "telefone": this.livroForm.get('telefone_editora')?.value,
      }

    let dadosLivro = {
      "isbn": this.livroForm.get('isbn')?.value,
      "nome": this.livroForm.get('nome')?.value,
      "valor": this.livroForm.get('valor')?.value,
      "autor": autor,
      "editora": editora,
      "estoque": {
        "sku": this.livroForm.get('sku')?.value,
        "quantidade": this.livroForm.get('quantidade')?.value,
        "isbn": this.livroForm.get('isbn')?.value
      }
    }

    console.log(dadosLivro)


    if(!this.livroForm.valid){
      console.log("invalido")
      return;
    }

    this.estoqueSrv.cadastrarLivro(dadosLivro).subscribe(
      (response: any) => {
        console.log(response);
		this.toast.success({
			detail: 'Novo livro cadastrado!',
			summary: `${dadosLivro.nome} foi cadastrado em estoque ✔`,
			duration: 5000
		})
    },
    (error) => {
      // TODO: error
      console.log(error);
	  this.toast.error({
		detail: 'Erro ao cadastrar novo livro 😢. Isso pode ser um erro de conexão ou você não está logado ❌. \n Se persistir, contate o administrador em (11) 0800-0404 📞',
		summary: error?.error?.message || null,
		duration: 5000
	})
    });
  }

  gerarRelatorio(tipoRelatorio: String)
  {
    let obs: Observable<any>;

    switch(tipoRelatorio) {
      case 'vendas':
        obs = this.relatorioSrv.gerarRelatorioVendas();
        break;

      case 'estoque':
        obs = this.relatorioSrv.gerarRelatorioUsuarios();
        break;

      case 'usuarios':
        obs = this.relatorioSrv.gerarRelatorioUsuarios();
        break;

      default:
        console.log("erro: tentou acessar um relatorio inexistente: ", tipoRelatorio)
        return;
    }

    obs.subscribe(
      (result) => {
        // TODO: avisar no toast
        console.log(result);
		this.toast.success({
			detail: 'Relatório gerado com sucesso! 😀',
			summary: `Seu relatório foi enviado para o email ${this.userSrv.getLoggedUser()?.email} 📧`,
			duration: 5000
		})
      },
      (error) => {
        // TODO: msg erro
        console.log(error);
		this.toast.error({
			detail: 'Erro ao gerar novo relatório 😢. Isso pode ser um erro de conexão ou você não está logado ❌. \n Se persistir, contate o administrador em (11) 0800-0404 📞',
			summary: error?.error?.message || null,
			duration: 5000
		})
      }
    )
  }

  returnToLoja(){
    // TODO: msg erro
		this.router.navigate(['/loja']);
  }
}
