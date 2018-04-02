import {LancamentoFiltro, LancamentoService} from './../lancamento.service';
import {Component, OnInit, ViewChild} from '@angular/core';
import {LazyLoadEvent} from 'primeng/components/common/api';
import {ToastyService} from 'ng2-toasty';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {

  totalRegistros = 0;
  lancamentos    = [];
  filtro         = new LancamentoFiltro();
  @ViewChild('tabela') grid;

  constructor(private lancamentoService: LancamentoService,
              private toastyService: ToastyService) { }

  ngOnInit() {
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;
    this.lancamentoService.pesquisar(this.filtro)
                          .then(resultado => {
                                this.totalRegistros = resultado.total;
                                this.lancamentos = resultado.lancamentos;
                          });
  }

  onChangePage(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }


  excluir(lancamento: any) {
    this.lancamentoService.excluir(lancamento.id)
                          .then( () => {
                            if (this.grid.first === 0) {
                              this.pesquisar();
                            } else {
                              this.grid.first = 0;
                            }
                            this.toastyService.success({
                              title: 'Exclusão de registro',
                              msg: 'Lancçamento ' + lancamento.id + ' excluído com sucesso!',
                              showClose: true,
                              timeout: 5000
                            });
                          });
  }
}
