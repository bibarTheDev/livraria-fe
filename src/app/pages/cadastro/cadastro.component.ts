import { Component } from '@angular/core';
import { Cadastro } from 'src/assets/classes/cadastro';
import { CadastroService } from './cadastroService/cadastro.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent {

  public valido: Boolean = false;
  public cadastro: Cadastro = {
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

  constructor(public srv: CadastroService) { }

  validar()
  {
    //validar de vdd dps
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
