import {Headers, URLSearchParams} from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import * as moment from 'moment';
import {Lancamento} from '../core/model';
import {AuthHttp} from 'angular2-jwt';
import {environment} from '../../environments/environment';

export class LancamentoFiltro {
  descricao: string;
  dataVencimentoInicio: Date;
  dataVencimentoFim: Date;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class LancamentoService {

  // lancamentosUrl = 'http://localhost:8080/lancamento';
  lancamentosUrl: string;

  constructor(private http: AuthHttp) {
    this.lancamentosUrl = `${environment.apiUrl}/lancamento`
  }

  pesquisar(filtro: LancamentoFiltro): Promise<any> {
    const params = new URLSearchParams();

    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());
    if (filtro.descricao) {
      params.set('descricao', filtro.descricao);
    }
    if (filtro.dataVencimentoInicio) {
      params.set('dataVencimentoInicial', moment(filtro.dataVencimentoInicio).format('YYYY-MM-DD'));
    }
    if (filtro.dataVencimentoFim) {
      params.set('dataVencimentoFinal', moment(filtro.dataVencimentoFim).format('YYYY-MM-DD'));
    }

    return this.http.get(this.lancamentosUrl + '?resumo',
      { search: params })
      .toPromise()
      .then(response => {
        const responseJson = response.json();
        const lancamentos  = responseJson.content;
        const result = {lancamentos,
                        total : responseJson.totalElements
                        }
         return result;
      })
  }

  excluir(codigo: number): Promise<void> {
    return this.http.delete(this.lancamentosUrl + '/' + codigo)
                    .toPromise()
                    .then(() => null);
  }

  adicionar(lancamento: Lancamento): Promise<Lancamento> {
    return this.http.post(this.lancamentosUrl, JSON.stringify(lancamento)).toPromise().then( response => response.json());

  }

  atualizar(lancamento: Lancamento): Promise<Lancamento> {
    return this.http.put(this.lancamentosUrl + '/' + lancamento.id, JSON.stringify(lancamento)).toPromise().then(response => {
      const lancamentoAlterado = response.json() as Lancamento;
      this.converterStringsParaDatas([lancamentoAlterado]);
      return lancamentoAlterado;
    });
  }

  find(id: number): Promise<Lancamento> {
    return this.http.get(this.lancamentosUrl + '/' + id).toPromise().then(response => {
      const lancamento = response.json() as Lancamento;
      this.converterStringsParaDatas([lancamento]);
      return lancamento;
    });
  }

  private converterStringsParaDatas(lancamentos: Lancamento[]) {
    for (const lancamento of lancamentos) {
      lancamento.dataVencimento = moment(lancamento.dataVencimento, 'YYYY-MM-DD').toDate();
      if (lancamento.dataPagamento) {
        lancamento.dataPagamento = moment(lancamento.dataPagamento, 'YYYY-MM-DD').toDate();
      }
    }
  }

}
