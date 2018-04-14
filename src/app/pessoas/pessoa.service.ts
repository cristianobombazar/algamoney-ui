import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {Headers, Http, URLSearchParams} from '@angular/http';
import {Lancamento, Pessoa} from '../core/model';
import {AuthHttp} from 'angular2-jwt';


export class FiltroPessoa {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class PessoaService {

  URI = 'http://localhost:8080/pessoa';

  constructor(private http: AuthHttp) { }

  pesquisar(filtro: FiltroPessoa): Promise<any> {
    const params = new URLSearchParams();
    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());
    if (filtro.nome) {
      params.set('nome', filtro.nome);
    }
    return this.http.get(this.URI + '?', {search : params})
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
    return this.http.get(this.URI + '?')
      .toPromise()
      .then( response => response.json().content);
  }

  excluir(codigo: number): Promise<void> {
    return this.http.delete(this.URI + '/' + codigo)
      .toPromise()
      .then(() => null);
  }

  alterarStatus(pessoa: any): Promise<void> {
    return this.http.put(this.URI + '/' + pessoa.id + '/ativo', !pessoa.ativo).toPromise()
      .then(() => null);
  }

  adicionar(pessoa: Pessoa): Promise<Pessoa> {
    return this.http.post(this.URI, JSON.stringify(pessoa)).toPromise().then( response => response.json());

  }

  atualizar(pessoa: Pessoa): Promise<Pessoa> {
    return this.http.put(this.URI + '/'+ pessoa.id , JSON.stringify(pessoa)).toPromise().then( response => response.json());

  }

  find(id: number): Promise<Pessoa> {
    return this.http.get(this.URI + '/' + id).toPromise().then(response => response.json());
  }



}
