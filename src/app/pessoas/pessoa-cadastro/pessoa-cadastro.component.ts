import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {PessoaService} from '../pessoa.service';
import {ToastyService} from 'ng2-toasty';
import {Pessoa} from '../../core/model';
import {ErrorHandlerService} from '../../core/error-handler.service';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  pessoa = new Pessoa();

  constructor(
    private pessoaService: PessoaService,
    private errorHandlerService: ErrorHandlerService,
    private toastyService: ToastyService
  ) { }

  ngOnInit() {
  }

  salvar(form: FormControl) {
    this.pessoaService.adicionar(this.pessoa)
                      .then(() => {
                        this.toastyService.success('Pessoa cadastrada com sucesso!')
                        form.reset();
                        this.pessoa = new Pessoa();
                      }).catch(error => this.errorHandlerService.handle(error))
  }

}
