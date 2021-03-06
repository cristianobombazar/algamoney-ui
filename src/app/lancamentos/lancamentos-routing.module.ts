import { NgModule } from '@angular/core';
import {LancamentosPesquisaComponent} from './lancamentos-pesquisa/lancamentos-pesquisa.component';
import {RouterModule, Routes} from '@angular/router';
import {LancamentoCadastroComponent} from './lancamento-cadastro/lancamento-cadastro.component';
import {AuthGuard} from '../seguranca/auth.guard';

const routes: Routes = [
  {path: 'lancamentos', component: LancamentosPesquisaComponent, canActivate: [AuthGuard], data: {roles: ['ROLE_PESQUISAR_LANCAMENTO']}},
  {path: 'lancamentos/novo', component: LancamentoCadastroComponent, canActivate: [AuthGuard], data: {roles: ['ROLE_CADASTRAR_LANCAMENTO']}},
  {path: 'lancamentos/:id', component: LancamentoCadastroComponent, canActivate: [AuthGuard], data: {roles: ['ROLE_CADASTRAR_LANCAMENTO']}}
];


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  declarations: [],
  exports: [RouterModule]
})
export class LancamentosRoutingModule { }
