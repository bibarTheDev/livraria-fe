import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Login } from 'src/assets/classes/login';
import { LoginService } from 'src/shared/services/loginService/login.service';
import { UserService } from 'src/shared/services/userService/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	loginForm: FormGroup;
	public hideInputSenha: boolean = true;

	constructor(
		public userSrv: UserService,
		public loginSrv: LoginService,
		public dialogRef: MatDialogRef<LoginComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		private formBuilder: FormBuilder,
		private router: Router
		) {
			this.loginForm = this.formBuilder.group({
				cpf: [, { validators: [Validators.required, Validators.pattern(/^\d+$/), Validators.maxLength(11), Validators.minLength(11)] }],
				senha: [, { validators: [Validators.required, Validators.pattern(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)] }],
			  });
	}

	ngOnInit(): void {}

	onNoClick(): void {
		this.dialogRef.close();
	}

	realizarLogin(): void {
		// TODO: guardar token jwt no localstorage
		// TODO: redirecionar para a página de loja
		console.log('Redirecionar para a página de loja');

		this.loginSrv.login(this.loginForm.value as Login).subscribe(
		(result) => {
			// essa eh a coisa mais horrorosoa que eu ja escrevi ate agora eu detesto merda nao consegui arranja um jeito melhor
			let token = (Array(result)[0] as unknown as {"access_token": String})["access_token"]

			this.userSrv.setUserToken(token);

			this.dialogRef.close();
			this.router.navigate(['/loja']);
		},
		(error) => {
			if(error.status == 401){
				console.log("dados invalidos")
			}
			else {
				console.log(error)
			}
		});
	}

	realizarCadastro(): void {
		console.log('Redirecionar para a página de cadastro');

		this.dialogRef.close();
		this.router.navigate(['/cadastro']);
	}
}
