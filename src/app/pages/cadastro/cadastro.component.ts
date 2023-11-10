import { Component } from '@angular/core';
import { Cadastro } from 'src/assets/classes/cadastro';
import { CadastroService } from './cadastroService/cadastro.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent {

  valido: Boolean = false;
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

  validador = new class {
    cpf: boolean = false;
    email: boolean = false;
    nome: boolean = false;
    telefone: boolean = false;
    senha: boolean = false;
    rua: boolean = false;
    cep: boolean = false;
    estado: boolean = false;
    cidade: boolean = false;

    validaCpf(value: String)
    {
      return this.cpf;
    }

    validaEmail(value: String)
    {
      this.email = /^[a-z0-9.]+\@[a-z]+(\.[a-z]+)+$/gm.test(value.valueOf());
    }

    validaNome(value: String)
    {
      return true;
    }

    validaTelefone(value: String)
    {
      return true;
    }

    validaSenha(value: String)
    {
      return true;
    }

    validaRua(value: String)
    {
      return true;
    }

    validaCep(value: String)
    {
      return true;
    }

    validaEstado(value: String, estados: String[])
    {
      return estados.includes(value);
    }

    validaCidade(value: String)
    {
      return true;
    }

    valida(): boolean
    {
      return this.cpf 
        && this.email 
        && this.nome 
        && this.telefone 
        && this.senha 
        && this.rua 
        && this.cep 
        && this.estado 
        && this.cidade 
    }
  }

  constructor(public srv: CadastroService) { }

  

  validar()
  {
    this.valido = true 
  }

  cadastrar()
  {
    if(!this.valido){
      return;
    }
    
    // para teste:
    this.cadastro = {
      "cpf": "12332155567",
      "email": "teste@email.com",
      "nome": "João da Silva",
      "telefone": "11994485668",
      "senha": "Abc@123",
      "rua": "Rua Mangaratiba, 65",
      "cep": "18136-191",
      "estado": "SP",
      "cidade": "São Roque"
    }

    this.srv.cadastrarUsuario(this.cadastro)
    .subscribe((response) => {
        console.log("chego");
        console.log(response);
      }
    );
  }
}
