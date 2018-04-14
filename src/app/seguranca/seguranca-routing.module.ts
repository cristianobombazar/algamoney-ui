import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginFormComponent} from './login-form/login-form.component';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {ButtonModule, InputTextModule} from 'primeng/primeng';

const routes: Routes = [
  { path: 'login', component: LoginFormComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [ RouterModule]
})
export class SegurancaRoutingModule { }
