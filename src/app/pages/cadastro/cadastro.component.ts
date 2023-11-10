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
    this.validadeCadastro.email = /^[a-z0-9.]+\@[a-z]+(\.[a-z]+)+$/gm.test(this.cadastro.email.valueOf());
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
    this.validadeCadastro.senha = /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/.test(this.cadastro.senha.valueOf());
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
    
    // para teste:
    // this.cadastro = {
    //   "cpf": "12332155567",
    //   "email": "teste@email.com",
    //   "nome": "João da Silva",
    //   "telefone": "11994485668",
    //   "senha": "Abc@123",
    //   "rua": "Rua Mangaratiba, 65",
    //   "cep": "18136-191",
    //   "estado": "SP",
    //   "cidade": "São Roque"
    // }
  
    console.log(this.cadastro);
    return;

    this.srv.cadastrarUsuario(this.cadastro)
    .subscribe((response) => {
        console.log("chego");
        console.log(response);
      }
    );
  }
}
