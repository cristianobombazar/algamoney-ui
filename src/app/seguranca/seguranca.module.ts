import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './login-form/login-form.component';
import {RouterModule, Routes} from '@angular/router';
import {ButtonModule, InputTextModule} from 'primeng/primeng';
import {SegurancaRoutingModule} from './seguranca-routing.module';
import {FormsModule} from '@angular/forms';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    SegurancaRoutingModule
  ],
  declarations: [LoginFormComponent],
  exports: [LoginFormComponent]
})
export class SegurancaModule { }
