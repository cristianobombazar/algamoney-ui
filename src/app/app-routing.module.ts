import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {PaginaNaoEncontradaComponent} from './core/pagina-nao-encontrada.component';
import {NaoAutorizadoComponent} from './core/nao-autorizado.component';

const routes: Routes = [
  {path: '', redirectTo: 'lancamentos', pathMatch: 'full'},
  {path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent},
  {path: 'nao-autorizada', component: NaoAutorizadoComponent},
  {path: '**', redirectTo: 'pagina-nao-encontrada'}, // ** SIGNIFICA QUE NAO FOI ENCONTRADO
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule] // exporta o routermodule para poder utilizar a diretiva routerlink no app component
})
export class AppRoutingModule { }
