import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LojaComponent } from './pages/loja/loja.component';
import { ProdutoComponent } from './pages/produto/produto.component';
import { CarrinhoComponent } from './pages/carrinho/carrinho.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { LoginComponent } from './pages/login/login.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { PagamentoComponent } from './pages/pagamento/pagamento.component';

const routes: Routes = [
  {
    path: "cadastro", component: CadastroComponent
  },
  {
    path: "login", component: LoginComponent
  },
  {
    path: "perfil", component: PerfilComponent
  },
  {
    path: "loja", component: LojaComponent
  },
  {
    path: "produto", component: ProdutoComponent
  },
  {
    path: "carrinho", component: CarrinhoComponent
  },
  {
    path: "pagamento", component: PagamentoComponent
  },
  {
    path: "*", redirectTo: "loja"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
