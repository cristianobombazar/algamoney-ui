import { Component, OnInit } from '@angular/core';
import {CategoriaService} from '../../categoria/categoria.service';
import {ErrorHandlerService} from '../../core/error-handler.service';
import {PessoaService} from '../../pessoas/pessoa.service';
import {Lancamento} from '../../core/model';
import {FormControl} from '@angular/forms';
import {LancamentoService} from '../lancamento.service';
import {ToastyService} from 'ng2-toasty';
import {ActivatedRoute, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';

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
    private route: ActivatedRoute,
    private router: Router,
    private titlePage: Title
  ) { }

  ngOnInit() {
    this.pesquisarCategorias();
    this.pesquisarPessoas();
    const id = this.route.snapshot.params['id']
    if (id) {
      this.find(this.route.snapshot.params['id']);
      this.title = 'Editar ';
    }else {
      this.titlePage.setTitle('Novo Lançamento');
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
      this.titlePage.setTitle('Editar Lançamento ' + this.lancamento.descricao);
    }).catch(error => this.errorHandler.handle(error));
  }

  adicionarLancamento(form: FormControl) {
    this.lancamentoService.adicionar(this.lancamento).then( lancamento => {
      this.toastyService.success('Lançamento adicionado com sucesso!');
      this.router.navigate(['/lancamentos/', lancamento.id]);

    }).catch(error => this.errorHandler.handle(error));
  }

  find(id: number) {
    this.lancamentoService.find(id).then( response => {
        this.lancamento = response;
        this.titlePage.setTitle('Editar Lançamento ' + this.lancamento.descricao);
    }).catch(erro => this.errorHandler.handle(erro));
  }

  novo(form: FormControl) {
    form.reset();
    setTimeout(function () {
      this.lancamento = new Lancamento();
    }.bind(this), 1); // bind this significa que o this é do cadastro component.
    this.router.navigate(['/lancamentos/novo']);
  }
}
