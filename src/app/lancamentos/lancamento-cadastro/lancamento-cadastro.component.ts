import { Component, OnInit } from '@angular/core';
import {CategoriaService} from '../../categoria/categoria.service';
import {ErrorHandlerService} from '../../core/error-handler.service';
import {PessoaService} from '../../pessoas/pessoa.service';
import {Lancamento} from '../../core/model';
import {FormControl} from '@angular/forms';
import {LancamentoService} from '../lancamento.service';
import {ToastyService} from 'ng2-toasty';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  tipos = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' },
  ];

  categorias = [];
  pessoas = [];
  lancamento = new Lancamento();
  title = 'Novo '

  constructor(
    private categoriaService: CategoriaService,
    private pessoaService: PessoaService,
    private lancamentoService: LancamentoService,
    private toastyService: ToastyService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.pesquisarCategorias();
    this.pesquisarPessoas();
    const id = this.route.snapshot.params['id']
    if (id) {
      this.find(this.route.snapshot.params['id']);
      this.title = 'Editar ';
    }
  }

  pesquisarCategorias() {
    return this.categoriaService.listarTodas()
      .then(categorias => {
        this.categorias = categorias.map(c => ({ label: c.nome, value: c.id }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  pesquisarPessoas() {
    return this.pessoaService.listarTodas()
      .then(pessoas => {
        this.pessoas = pessoas.map(p => ({ label: p.nome, value: p.id }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  salvar(form: FormControl) {
    if (this.lancamento.id) {
      this.atualizarLancamento(form);
    } else {
      this.adicionarLancamento(form);
    }
  }

  atualizarLancamento(form: FormControl) {
    this.lancamentoService.atualizar(this.lancamento).then( lancamento => {
      this.toastyService.success('Lançamento salvo com sucesso!');
      this.lancamento = lancamento;
    }).catch(error => this.errorHandler.handle(error));
  }

  adicionarLancamento(form: FormControl) {
    this.lancamentoService.adicionar(this.lancamento).then( () => {
      this.toastyService.success('Lançamento adicionado com sucesso!');
      form.reset();
      this.lancamento = new Lancamento();
    }).catch(error => this.errorHandler.handle(error));
  }

  find(id: number) {
    this.lancamentoService.find(id).then( response => {
        this.lancamento = response;
    }).catch(erro => this.errorHandler.handle(erro));
  }
}
