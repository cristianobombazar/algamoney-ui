import { NgModule } from '@angular/core';
import {LancamentosPesquisaComponent} from './lancamentos-pesquisa/lancamentos-pesquisa.component';
import {RouterModule, Routes} from '@angular/router';
import {LancamentoCadastroComponent} from './lancamento-cadastro/lancamento-cadastro.component';

const routes: Routes = [
  {path: 'lancamentos', component: LancamentosPesquisaComponent},
  {path: 'lancamentos/novo', component: LancamentoCadastroComponent},
  {path: 'lancamentos/:id', component: LancamentoCadastroComponent},
];


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  declarations: [],
  exports: [RouterModule]
})
export class LancamentosRoutingModule { }
