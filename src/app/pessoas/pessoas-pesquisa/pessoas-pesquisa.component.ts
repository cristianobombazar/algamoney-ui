import {Component, OnInit, ViewChild} from '@angular/core';
import {FiltroPessoa, PessoaService} from '../pessoa.service';
import {LazyLoadEvent} from 'primeng/components/common/api';
import {ConfirmationService} from 'primeng/primeng';
import {ToastyService} from 'ng2-toasty';
import {ErrorHandlerService} from '../../core/error-handler.service';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit{

  totalRegistros = 0;
  pessoas = [];
  filtro = new FiltroPessoa();
  @ViewChild('tabela') grid;

  constructor(
    private pessoaService: PessoaService,
    private confirmationService: ConfirmationService,
    private toastyService: ToastyService,
    private errorHandlerService: ErrorHandlerService,
    private title: Title
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Pesquisa de Pessoas')
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

  confirmDialog(pessoa: any) {
    this.confirmationService.confirm({
      message: 'Deseja excluir a pessoa ' + pessoa.nome + ' ?',
      accept: () => {
        this.excluir(pessoa);
      },
      reject: () => {

      }
    });
  }

  excluir(pessoa: any) {
    this.pessoaService.excluir(pessoa.id)
      .then( () => {
        if (this.grid.first === 0) {
          this.pesquisar();
        } else {
          this.grid.first = 0;
        }
        this.toastyService.success({
          title: 'Exclusão de registro',
          msg: 'Pessoa ' + pessoa.nome + ' excluída com sucesso!',
          showClose: true,
          timeout: 5000
        });
      }).catch(error => this.errorHandlerService.handle(error));
  }

  alterarStatus(pessoa: any) {
    this.pessoaService.alterarStatus(pessoa)
      .then( () => {
        if (this.grid.first === 0) {
          this.pesquisar();
        } else {
          this.grid.first = 0;
        }
        this.toastyService.success({
          title: 'Alteração de Status',
          msg: 'Pessoa ' + pessoa.nome + ' foi ' + (pessoa.ativo ? 'Inativada' : 'Ativada') + '  com sucesso!',
          showClose: true,
          timeout: 5000
        });
      }).catch(error => this.errorHandlerService.handle(error));
  }



}
