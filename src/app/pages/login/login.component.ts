import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
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
		private router: Router,
		private toast: NgToastService,
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

	validarCamposLogin(): void {
		if (this.loginForm.valid) {
			const cpf = this.loginForm.get('cpf')?.value;
			const senha = this.loginForm.get('senha')?.value;
			console.log(cpf, senha)
			console.log(typeof(cpf), typeof(senha))
			this.realizarLogin(cpf, senha);
		}
	}

	private realizarLogin(cpf: string, senha: string): void {
		this.loginSrv.login(cpf, senha).subscribe(
			(response: any) => {

				this.userSrv.setCpf(cpf);
				this.userSrv.setUserToken(response.access_token);

				this.toast.success({
					detail: 'Login realizado com sucesso!',
					summary: 'Login realizado com sucesso',
					duration: 5000,
					position: 'bottomRight'
				})
				this.dialogRef.close();
			},
			(error) => {
				console.log(error)
				this.toast.error({
					detail: 'Erro ao realizar login',
					summary: error?.error?.message || null,
					duration: 5000
				})
				this.loginForm.reset();
			}
		)
	}

	realizarCadastro(): void {
		console.log('Redirecionar para a página de cadastro');

		this.dialogRef.close();
		this.router.navigate(['/cadastro']);
	}
}
