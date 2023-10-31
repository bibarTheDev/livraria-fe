import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LojaComponent } from './pages/loja/loja.component';
import { ProdutoComponent } from './pages/produto/produto.component';
import { CarrinhoComponent } from './pages/carrinho/carrinho.component';

const routes: Routes = [
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
    path: "*", redirectTo: "loja"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
