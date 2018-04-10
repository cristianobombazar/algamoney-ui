import { Injectable } from '@angular/core';
import {Headers, Http} from '@angular/http';

@Injectable()
export class CategoriaService {

  URI = 'http://localhost:8080/categoria';

  constructor(private http: Http) { }

  listarTodas(): Promise<any> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    return this.http.get(this.URI, { headers })
      .toPromise()
      .then(response => response.json());
  }

}
