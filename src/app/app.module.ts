import { LancamentoService } from './lancamentos/lancamento.service';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {ToastyModule} from 'ng2-toasty';

import { CoreModule } from './core/core.module';
import { PessoasModule } from './pessoas/pessoas.module';
import { LancamentosModule } from './lancamentos/lancamentos.module';
import {PessoaService} from './pessoas/pessoa.service';
import { AppComponent } from './app.component';
import {ConfirmDialogModule, ConfirmationService,  SharedModule} from 'primeng/primeng';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,

    ToastyModule.forRoot(),
    ConfirmDialogModule,
    SharedModule,

    CoreModule,
    LancamentosModule,
    PessoasModule
  ],
  providers: [LancamentoService, PessoaService, ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
