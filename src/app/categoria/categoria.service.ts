import { Injectable } from '@angular/core';
import { AuthHttp} from 'angular2-jwt';

@Injectable()
export class CategoriaService {

  URI = 'http://localhost:8080/categoria';

  constructor(private http: AuthHttp) { }

  listarTodas(): Promise<any> {
    return this.http.get(this.URI)
      .toPromise()
      .then(response => response.json());
  }

}
