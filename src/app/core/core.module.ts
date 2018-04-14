import {LOCALE_ID, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';

import {ConfirmationService, ConfirmDialogModule} from 'primeng/primeng';
import {ToastyModule} from 'ng2-toasty';

import {ErrorHandlerService} from './error-handler.service';
import { NavbarComponent } from './navbar/navbar.component';
import {LancamentoService} from '../lancamentos/lancamento.service';
import {PessoaService} from '../pessoas/pessoa.service';
import {CategoriaService} from '../categoria/categoria.service';
import {RouterModule} from '@angular/router';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';
import {Title} from '@angular/platform-browser';
import {AuthService} from '../seguranca/auth.service';
import {JwtHelper} from 'angular2-jwt';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ToastyModule.forRoot(),
    ConfirmDialogModule,
  ],
  declarations: [NavbarComponent, PaginaNaoEncontradaComponent],
  exports: [NavbarComponent, ToastyModule, ConfirmDialogModule],
  providers: [
    ErrorHandlerService,
    LancamentoService,
    PessoaService,
    ConfirmationService,
    CategoriaService,
    AuthService,
    JwtHelper,
    Title,
    {provide: LOCALE_ID, useValue: 'pt-BR'}
  ]
})
export class CoreModule { }
