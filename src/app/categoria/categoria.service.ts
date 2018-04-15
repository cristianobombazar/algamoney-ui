import { Injectable } from '@angular/core';
import { AuthHttp} from 'angular2-jwt';
import {environment} from '../../environments/environment';

@Injectable()
export class CategoriaService {

  // URI = 'http://localhost:8080/categoria';
  URI: string;

  constructor(private http: AuthHttp) {
    this.URI = `${environment.apiUrl}/categoria`;
  }

  listarTodas(): Promise<any> {
    return this.http.get(this.URI)
      .toPromise()
      .then(response => response.json());
  }

}
