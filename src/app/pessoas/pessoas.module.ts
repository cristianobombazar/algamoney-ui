import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PessoaPesquisaComponent} from './pessoa-pesquisa/pessoa-pesquisa.component';
import {PessoaCadastroComponent} from './pessoa-cadastro/pessoa-cadastro.component';
import {PessoaGridComponent} from './pessoa-grid/pessoa-grid.component';
import {FormsModule} from '@angular/forms';
import {InputMaskModule} from 'primeng/components/inputmask/inputmask';
import {DataTableModule} from 'primeng/components/datatable/datatable';
import {TooltipModule} from 'primeng/components/tooltip/tooltip';
import {InputTextModule} from 'primeng/components/inputtext/inputtext';
import {ButtonModule} from 'primeng/components/button/button';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    DataTableModule,
    TooltipModule,
    InputMaskModule,
    SharedModule
  ],
  declarations: [
    PessoaPesquisaComponent,
    PessoaCadastroComponent,
    PessoaGridComponent
  ],
  exports: [
    PessoaPesquisaComponent,
    PessoaCadastroComponent
  ]
})
export class PessoasModule { }
