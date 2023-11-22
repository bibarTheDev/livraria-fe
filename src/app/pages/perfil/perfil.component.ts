import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/shared/services/userService/user.service';
import { Endereco } from 'src/assets/classes/endereco';
import { Usuario } from 'src/assets/classes/usuario';
import { PerfilService } from './perfilService/perfil.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent {

  userData: Usuario = { } as Usuario;

  constructor(
    public userSrv: UserService,
    public perfilSrv: PerfilService,
    public router: Router,
  ) { 

    let user = userSrv.getLoggedUser();
    
    if(user){
      perfilSrv.getUserData(user.cpf).subscribe(
        (response) => {
          this.userData = response as unknown as Usuario;
          console.log(this.userData);
        },
        (error) => {
          console.log(error);
        }
      );
    }
    else{
      this.logout();
    }
  }

  logout()
  {
    this.userSrv.setLoggedUser(null);
    this.userSrv.setUserToken("");
		this.router.navigate(['/loja']);
  }
}
