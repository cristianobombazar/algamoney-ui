import { Injectable } from '@angular/core';
import {Headers, Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService {

  oauthTokenURL = 'http://localhost:8080/oauth/token';


  constructor(private http: Http) { }

  login(usuario: string, senha: string): Promise<void> {
    const body = `username=${usuario}&password=${senha}&grant_type=password`;
    const headers = new Headers();
    headers.append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');
    headers.append('Content-Type', 'application/x-www-form-urlencoded');


    return this.http.post(this.oauthTokenURL, body, {headers}).toPromise().then( response => {
      console.log(response);
    }).catch(response => {
      console.log(response);
    })
  }

}
