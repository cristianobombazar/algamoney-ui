import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {LancamentosPesquisaComponent} from './lancamentos/lancamentos-pesquisa/lancamentos-pesquisa.component';
import {LancamentoCadastroComponent} from './lancamentos/lancamento-cadastro/lancamento-cadastro.component';
import {PessoasPesquisaComponent} from './pessoas/pessoas-pesquisa/pessoas-pesquisa.component';
import {PaginaNaoEncontradaComponent} from './core/pagina-nao-encontrada.component';
import {PessoaCadastroComponent} from './pessoas/pessoa-cadastro/pessoa-cadastro.component';

const routes: Routes = [
  {path: '', redirectTo: 'lancamentos', pathMatch: 'full'},
  {path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent},
  {path: '**', redirectTo: 'pagina-nao-encontrada'}, // ** SIGNIFICA QUE NAO FOI ENCONTRADO
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule] // exporta o routermodule para poder utilizar a diretiva routerlink no app component
})
export class AppRoutingModule { }
