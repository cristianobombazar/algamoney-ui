import { Injectable } from '@angular/core';
import {Headers, Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {JwtHelper} from 'angular2-jwt';
import {environment} from '../../environments/environment';

@Injectable()
export class AuthService {

  // oauthTokenURL = 'http://localhost:8080/oauth/token';
  oauthTokenURL: string;
  jwtPayload: any;


  constructor(
    private http: Http,
    private jwtHelper: JwtHelper
  ) {
    this.oauthTokenURL = `${environment.apiUrl}/oauth/token`;
    this.carregarToken();
  }

  login(usuario: string, senha: string): Promise<void> {
    const body = `username=${usuario}&password=${senha}&grant_type=password`;
    const headers = new Headers();
    headers.append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    // withCredentials envia o cookia para não dar erro de CORS
    return this.http.post(this.oauthTokenURL, body, {headers, withCredentials: true}).toPromise().then( response => {
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
    localStorage.setItem('token', token); // por padrão é token. Se mudar o nome, deve ser alterado no AuthConfig (SegurancaModule)
  }

  private carregarToken() {
    const token = localStorage.getItem('token');
    if (token) {
      this.armazenarToken(token);
    }
  }

  temPermissao(permissao: string) {
    return this.jwtPayload && this.jwtPayload.authorities.includes(permissao);
  }

  obterNovoAccessToken(): Promise<void> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');

    const body = 'grant_type=refresh_token';

    return this.http.post(this.oauthTokenURL, body,
      { headers, withCredentials: true })
      .toPromise()
      .then(response => {
        this.armazenarToken(response.json().access_token);

        console.log('Novo access token criado!');

        return Promise.resolve(null);
      })
      .catch(response => {
        console.error('Erro ao renovar token.', response);
        return Promise.resolve(null);
      });
  }

  isAcessTokenInvalido() {
    const token = localStorage.getItem('token');
    return !token || this.jwtHelper.isTokenExpired(token);
  }

  temQualquerPermissao(roles) {
    for (const role of roles){
      if (this.temPermissao(role)) {
        return true;
      }
    }
    return false;
  }

  limparAcessToken() {
    localStorage.removeItem('token');
    this.jwtPayload = null;
  }


}
