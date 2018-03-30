import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pessoa-pesquisa',
  templateUrl: './pessoa-pesquisa.component.html',
  styleUrls: ['./pessoa-pesquisa.component.css']
})
export class PessoaPesquisaComponent implements OnInit {

  pessoas = [];
  ngOnInit() {
    this.pessoas = [
      {nome : 'Cristiano Bombazar', cidade: 'Braço do Norte', estado : 'SC', ativo: true},
      {nome : 'Francilene Boeing', cidade: 'Braço do Norte', estado : 'SC', ativo: false},
      {nome : 'Maristela Rabelo', cidade: 'São Ludgero', estado : 'SC', ativo: true},
      {nome : 'Leandro Bombazar', cidade: 'São Ludgero', estado : 'SC', ativo: true},
      {nome : 'irma Selhorst Boeing', cidade: 'Grão Pará', estado : 'SC', ativo: false},
      {nome : 'Valdir Bombazar', cidade: 'Orleans', estado : 'SC', ativo: true},
      {nome : 'Carlos Alberto Bombazar', cidade: 'São Ludgero', estado : 'SC', ativo: false},
      {nome : 'Cristiano Bombazar 3', cidade: 'Braço do Norte', estado : 'SC', ativo: true},
      {nome : 'Cristiano Bombazar 4' , cidade: 'Braço do Norte', estado : 'SC', ativo: true},
      {nome : 'Cristiano Bombazar 5', cidade: 'Braço do Norte', estado : 'SC', ativo: true}
    ];
  }
}
