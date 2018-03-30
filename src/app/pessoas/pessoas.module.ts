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
import {InputTextareaModule} from 'primeng/components/inputtextarea/inputtextarea';
import {DropdownModule} from 'primeng/components/dropdown/dropdown';
import {ButtonModule} from 'primeng/components/button/button';
import {CalendarModule} from 'primeng/components/calendar/calendar';
import {SelectButtonModule} from 'primeng/components/selectbutton/selectbutton';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    DataTableModule,
    TooltipModule,
    InputMaskModule
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
