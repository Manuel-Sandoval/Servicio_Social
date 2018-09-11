import { Injectable } from '@angular/core';
import {ApiService} from './api.service';
import {map} from 'rxjs/operators';
import {PaisModel} from '../shared/models';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  constructor(public api: ApiService) { }

  getPaises() {
    return this.api.get('/paises').pipe(map(data => {
      console.log(data);
      return data.paises;
    }));
  }

  getPais(id: number) {
    return this.api.get('/paises/' + id).pipe(map(data => {
      return data.pais;
    }));
  }

  newPais(pais: PaisModel) {
    return this.api.post('/paises', {pais});
  }

  updatePais(pais: PaisModel) {
    return this.api.put('/paises/' + pais.ID_PAIS, {pais});
  }
}
