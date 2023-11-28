import { Component } from '@angular/core';
import { RelatorioService } from './relatorioService/relatorio.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {

  constructor (
    public relatorioSrv: RelatorioService
  ) { }

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
        console.log(error);
      }
    )
  }
}
