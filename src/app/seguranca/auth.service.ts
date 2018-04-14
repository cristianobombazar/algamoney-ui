import { Injectable } from '@angular/core';
import {Headers, Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {JwtHelper} from 'angular2-jwt';

@Injectable()
export class AuthService {

  oauthTokenURL = 'http://localhost:8080/oauth/token';
  jwtPayload: any;


  constructor(
    private http: Http,
    private jwtHelper: JwtHelper
  ) {
    this.carregarToken();
  }

  login(usuario: string, senha: string): Promise<void> {
    const body = `username=${usuario}&password=${senha}&grant_type=password`;
    const headers = new Headers();
    headers.append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post(this.oauthTokenURL, body, {headers}).toPromise().then( response => {
      console.log(response);
      this.armazenarToken(response.json().access_token)
    }).catch(response => {
      if (response.status === 400) {
        const responseJson = response.json();
        if (responseJson.error  === 'invalid_grant') {
          return Promise.reject('Usuário ou senha inválida')
        }
      }
      return Promise.reject(response);
    })
  }

  private armazenarToken(token: string) {
    this.jwtPayload = this.jwtHelper.decodeToken(token);
    localStorage.setItem('token', token); //por padrão é token. Se mudar o nome, deve ser alterado no AuthConfig (SegurancaModule)
  }

  private carregarToken() {
    const token = localStorage.getItem('token');
    if (token) {
      this.armazenarToken(token);
    }
  }

}
