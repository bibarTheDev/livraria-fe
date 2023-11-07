import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LojaComponent } from './pages/loja/loja.component';
import { ProdutoComponent } from './pages/produto/produto.component';
import { CarrinhoComponent } from './pages/carrinho/carrinho.component';
import { SharedModule } from 'src/shared/shared.module';
import { HttpService } from 'src/shared/services/httpService/http.service';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './pages/login/login.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component'

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
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
