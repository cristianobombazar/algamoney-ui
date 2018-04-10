import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {Headers, Http, URLSearchParams} from '@angular/http';


export class FiltroPessoa {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class PessoaService {

  URI = 'http://localhost:8080/pessoa';

  constructor(private http: Http) { }

  pesquisar(filtro: FiltroPessoa): Promise<any> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    const params = new URLSearchParams();
    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());
    if (filtro.nome) {
      params.set('nome', filtro.nome);
    }
    return this.http.get(this.URI + '?', {headers, search : params})
                     .toPromise()
                     .then( response => {
                       const responseJson = response.json();
                       const pessoas  = responseJson.content;
                       const result = {
                         pessoas: pessoas,
                         total : responseJson.totalElements
                       }
                       return result;
                     });
  }

  listarTodas(): Promise<any> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return this.http.get(this.URI + '?', {headers})
      .toPromise()
      .then( response => response.json().content);
  }

  excluir(codigo: number): Promise<void> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    return this.http.delete(this.URI + '/' + codigo, {headers})
      .toPromise()
      .then(() => null);
  }

  alterarStatus(pessoa: any): Promise<void> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    headers.append('Content-Type', 'application/json');
    return this.http.put(this.URI + '/' + pessoa.id + '/ativo', !pessoa.ativo, {headers}).toPromise()
      .then(() => null);
  }

}
