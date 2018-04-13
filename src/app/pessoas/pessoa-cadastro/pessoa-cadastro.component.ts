import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {PessoaService} from '../pessoa.service';
import {ToastyService} from 'ng2-toasty';
import {Lancamento, Pessoa} from '../../core/model';
import {ErrorHandlerService} from '../../core/error-handler.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  pessoa = new Pessoa();
  titlePage = 'Nova ';

  constructor(
    private errorHandler: ErrorHandlerService,
    private pessoaService: PessoaService,
    private errorHandlerService: ErrorHandlerService,
    private toastyService: ToastyService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.find(id);
      this.titlePage = 'Edtar ';
    }else {
        this.title.setTitle('Nova Pessoa');
    }
  }

  salvar(form: FormControl) {
    if (this.pessoa.id) {
      this.atualizarPessoa(form);
    } else {
      this.adicionarPessoa(form);
    }
  }

  atualizarPessoa(form: FormControl) {
    this.pessoaService.atualizar(this.pessoa)
      .then(pessoa => {
        this.toastyService.success('Pessoa salva com sucesso!')
        this.pessoa = pessoa;
        this.title.setTitle('Editar pessoa ' + this.pessoa.nome);
      }).catch(error => this.errorHandlerService.handle(error))
  }

  adicionarPessoa(form: FormControl) {
    this.pessoaService.adicionar(this.pessoa)
                      .then(pessoa => {
                        this.toastyService.success('Pessoa cadastrada com sucesso!')
                        this.pessoa = pessoa;
                        this.router.navigate(['/pessoas/', this.pessoa.id]);
                      }).catch(error => this.errorHandlerService.handle(error))
  }

  find(id: number) {
    this.pessoaService.find(id).then( response => {
      this.pessoa = response;
      this.title.setTitle('Editar Pessoa: ' + this.pessoa.nome);
    }).catch(erro => this.errorHandler.handle(erro));
  }

  novo(form: FormControl) {
    form.reset();
    setTimeout(function () {
      this.pessoa = new Lancamento();
    }.bind(this), 1); // bind this significa que o this é do cadastro component.
    this.router.navigate(['/pessoas/novo']);
  }

}
