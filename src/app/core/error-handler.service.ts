import { Injectable } from '@angular/core';
import {ToastyService} from 'ng2-toasty';

@Injectable()
export class ErrorHandlerService {

  constructor(
    private toastyService: ToastyService
  ) { }

  handle(errorResponse: any) {
    let msg :string;
    if (typeof  errorResponse === 'string') {
      msg = errorResponse;
    }else {
      msg = 'Erro ao processar serviço remoto. Tente novamente.';
      console.log('Ocorreu um error', errorResponse);
    }
    this.toastyService.error(msg)
  }

}