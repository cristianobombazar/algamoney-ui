import { Component, OnInit } from '@angular/core';
import {FiltroPessoa, PessoaService} from '../pessoa.service';
import {LazyLoadEvent} from 'primeng/components/common/api';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit{

  totalRegistros = 0;
  pessoas = [];
  filtro = new FiltroPessoa();

  constructor(private pessoaService: PessoaService) {}

  ngOnInit(): void {
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;
    this.pessoaService.pesquisar(this.filtro)
                      .then(resultado => {
                          this.totalRegistros = resultado.total;
                          this.pessoas = resultado.pessoas;
                      });
  }

  onChangePage(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }



}
