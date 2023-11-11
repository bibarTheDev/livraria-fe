import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatToolbarModule } from "@angular/material/toolbar";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgToastModule } from 'ng-angular-popup';
import { HttpService } from 'src/shared/services/httpService/http.service';
import { SharedModule } from 'src/shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { CarrinhoComponent } from './pages/carrinho/carrinho.component';
import { LoginComponent } from './pages/login/login.component';
import { LojaComponent } from './pages/loja/loja.component';
import { ProdutoComponent } from './pages/produto/produto.component';

@NgModule({
  declarations: [
    AppComponent,
    LojaComponent,
    ProdutoComponent,
    CarrinhoComponent,
    LoginComponent,
    CadastroComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    BrowserAnimationsModule,
	MatIconModule,
	MatToolbarModule,
	MatPaginatorModule,
    NgToastModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
