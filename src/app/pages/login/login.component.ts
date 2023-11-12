import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	loginForm: FormGroup;
	public hideInputSenha: boolean = true;

	constructor(
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
		this.dialogRef.close();
	}

	realizarCadastro(): void {
		// Adicione aqui a lógica para redirecionar para a página de cadastro
		console.log('Redirecionar para a página de cadastro');
		this.dialogRef.close();
		this.router.navigate(['/cadastro']);
	}
}
