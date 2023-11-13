import { Component } from '@angular/core';
import { Cadastro } from 'src/assets/classes/cadastro';
import { CadastroService } from './cadastroService/cadastro.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent {

  cadastro: Cadastro = {
    "cpf": "",
    "email": "",
    "nome": "",
    "telefone": "",
    "senha": "",
    "rua": "",
    "cep": "",
    "estado": "",
    "cidade": "",
  };

  listaEstados: String[] = [
    "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MS", "MT", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"
  ];

  validadeCadastro =  {
    cpf: false,
    email: false,
    nome: false,
    telefone: false,
    senha: false,
    rua: false,
    cep: false,
    estado: false,
    cidade: false,
    all: false
  }

  validaCpf() {
    this.validadeCadastro.cpf = true;
  }

  validaEmail() { 
    this.validadeCadastro.email = /^[A-Za-z0-9.]+\@[a-z]+(\.[a-z]+)+$/gm.test(this.cadastro.email.valueOf());
    this.validadeCadastro.all = this.valida();
  }

  validaNome() {
    this.validadeCadastro.nome = true;
    this.validadeCadastro.all = this.valida();
  }

  validaTelefone() {
    this.validadeCadastro.telefone = true;
    this.validadeCadastro.all = this.valida();
  }

  validaSenha() { 
    this.validadeCadastro.senha = 
      /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/.test(this.cadastro.senha.valueOf())
      && this.cadastro.senha.length > 3
      && this.cadastro.senha.length < 19;
    this.validadeCadastro.all = this.valida();
  }

  validaRua() {
    this.validadeCadastro.rua = true;
    this.validadeCadastro.all = this.valida();
  }

  validaCep() {
    this.validadeCadastro.cep = true;
    this.validadeCadastro.all = this.valida();
  }

  validaEstado() {
    this.validadeCadastro.estado = this.listaEstados.includes(this.cadastro.estado); console.log(this.listaEstados, this.cadastro.estado)
    this.validadeCadastro.all = this.valida();
  }

  validaCidade() {
    this.validadeCadastro.cidade = true;
    this.validadeCadastro.all = this.valida();
  }

  valida(): boolean
  {
    return this.validadeCadastro.cpf
      && this.validadeCadastro.email
      && this.validadeCadastro.nome
      && this.validadeCadastro.telefone
      && this.validadeCadastro.senha
      && this.validadeCadastro.rua
      && this.validadeCadastro.cep
      && this.validadeCadastro.estado
      && this.validadeCadastro.cidade
  }

  constructor(public srv: CadastroService) { }

  cadastrar()
  {
    if(!this.valida()){
      return;
    }

    console.log(this.cadastro);

    this.srv.cadastrarUsuario(this.cadastro).subscribe(
      (result) => {
        console.log("foi cadastro", result);
        // deve realizar login
      },
      (error) => {
        if(error.status == 400){
          console.log("dados invalidos");
        }
        else {
          console.log(error)
        }
      }
    );
  }
}
