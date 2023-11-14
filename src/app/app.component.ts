import { Component } from '@angular/core';
import { LoginService } from 'src/shared/services/loginService/login.service';
import { LoginComponent } from './pages/login/login.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'livraria-fe';
  
  constructor(public srv: LoginService, private dialog: MatDialog, private router: Router) {}


  
	abrirModalLogin() {
		const dialogRef = this.dialog.open(LoginComponent, {
			width: '400px'
			// outros configs
		});

		dialogRef.afterClosed().subscribe(result => {
			console.log('The dialog was closed');
		});
	}
  
	handleConta() {
		this.srv.getMe().subscribe(
			(response: any) => {
				console.log(`exibir tela de conta`)
			},
			(error) => {
				console.log(`abrir modal de login`)
				this.abrirModalLogin();
			}
		)
	}

	redirecionarHome(): void {
		this.router.navigate(['/']);
	}
}
