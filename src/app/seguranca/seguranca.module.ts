import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './login-form/login-form.component';
import {ButtonModule, InputTextModule} from 'primeng/primeng';
import {SegurancaRoutingModule} from './seguranca-routing.module';
import {FormsModule} from '@angular/forms';
import {AuthHttp, AuthConfig} from 'angular2-jwt';
import {Http, RequestOptions} from '@angular/http';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  const headers = {globalHeaders: [{'Content-Type' : 'application/json'}]}
  const config = new AuthConfig(headers);
  return new AuthHttp(config, http, options);
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    SegurancaRoutingModule
  ],
  declarations: [LoginFormComponent],
  exports: [LoginFormComponent],
  providers: [
    {provide: AuthHttp,
     useFactory: authHttpServiceFactory,
     deps: [Http, RequestOptions]
    }
  ]
})
export class SegurancaModule { }
