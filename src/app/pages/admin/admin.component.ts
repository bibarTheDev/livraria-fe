import { Component } from '@angular/core';
import { RelatorioService } from './relatorioService/relatorio.service';
import { Observable } from 'rxjs';
import { PerfilService } from '../perfil/perfilService/perfil.service';
import { Router } from '@angular/router';
import { UserService } from 'src/shared/services/userService/user.service';
import { Usuario } from 'src/assets/classes/usuario';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EstoqueService } from './estoqueService/estoque.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {

	livroForm: FormGroup;
  dadosAutores: any[] = [];
  dadosEditoras: any[] = [];

  constructor (
		public userSrv: UserService,
    public relatorioSrv: RelatorioService,
    public estoqueSrv: EstoqueService,
    public perfilSrv: PerfilService,
    public router: Router,
		private formBuilder: FormBuilder,
  ) { 

    // checa se eh um usuario valido
    let user = userSrv.getLoggedUser();
    
    if(user){
      perfilSrv.getUserData(user.cpf).subscribe(
        (response) => {
          let userData = response as unknown as Usuario;
          console.log(userData);

          if(!userData.admin){
            this.returnToLoja();
          }
        },
        (error) => {
          // TODO: error
          console.log(error);
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
      editora: [, { validators: [Validators.required] }],
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
    });
      
    this.estoqueSrv.getEditoras().subscribe(
      (response: any) => {
        console.log(response);
        this.dadosEditoras = response.data as any[]
    },
    (error) => {
      // TODO: error
      console.log(error);
    });

  }

  cadastrarLivro() {
    if(!this.livroForm.valid){
      return
    }

    let dadosLivro = {
      "isbn": this.livroForm.get('isbn')?.value,
      "nome": this.livroForm.get('nome')?.value,
      "valor": this.livroForm.get('valor')?.value,
      "autor": this.livroForm.get('autor')?.value,
      "editora": this.livroForm.get('editora')?.value,
      "estoque": {
          "sku": this.livroForm.get('sku')?.value,
          "quantidade": this.livroForm.get('quantidade')?.value,
          "isbn": this.livroForm.get('isbn')?.value
      }
    }

    console.log(dadosLivro)
 
    this.estoqueSrv.cadastrarLivro(dadosLivro).subscribe(
      (response: any) => {
        console.log(response);
    },
    (error) => {
      // TODO: error
      console.log(error);
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
      },
      (error) => {
        // TODO: msg erro
        console.log(error);
      }
    )
  }

  returnToLoja(){
    // TODO: msg erro
		this.router.navigate(['/loja']);
  }
}
