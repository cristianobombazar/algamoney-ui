import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent {

  lancamentos = [
    { tipo: 'DESPESA', descricao: 'Compra de pão',          dataVencimento: new Date(2017, 6, 17 ), dataPagamento: null, valor: 4.55, pessoa: 'Padaria do José' },
    { tipo: 'RECEITA', descricao: 'Venda de software',      dataVencimento: new Date(2017, 6, 10 ), dataPagamento: new Date(2017, 6, 9 ), valor: 80000, pessoa: 'Atacado Brasil' },
    { tipo: 'DESPESA', descricao: 'Impostos',               dataVencimento: new Date(2017, 7, 20 ), dataPagamento: null, valor: 14312, pessoa: 'Ministério da Fazenda' },
    { tipo: 'DESPESA', descricao: 'Mensalidade de escola',  dataVencimento: new Date(2017, 8, 5 ), dataPagamento: new Date(2017, 5, 30 ), valor: 800, pessoa: 'Escola Abelha Rainha' },
    { tipo: 'RECEITA', descricao: 'Venda de carro',         dataVencimento: new Date(2017, 9, 5 ), dataPagamento: null, valor: 55000, pessoa: 'Sebastião Souza' },
    { tipo: 'DESPESA', descricao: 'Aluguel',                dataVencimento: new Date(2017, 10, 5 ), dataPagamento: new Date(2017, 7, 9 ), valor: 1750, pessoa: 'Casa Nova Imóveis' },
    { tipo: 'DESPESA', descricao: 'Mensalidade musculação', dataVencimento: new Date(2017, 11, 5 ), dataPagamento: null, valor: 180, pessoa: 'Academia Top' }
  ];

}
