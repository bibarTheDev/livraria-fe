import { Component } from '@angular/core';
import { RelatorioService } from './relatorioService/relatorio.service';
import { Observable } from 'rxjs';
import { PerfilService } from '../perfil/perfilService/perfil.service';
import { Router } from '@angular/router';
import { UserService } from 'src/shared/services/userService/user.service';
import { Usuario } from 'src/assets/classes/usuario';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {

  constructor (
		public userSrv: UserService,
    public relatorioSrv: RelatorioService,
    public perfilSrv: PerfilService,
    public router: Router,
  ) { 

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
