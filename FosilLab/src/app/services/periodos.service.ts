import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';
import {PeriodoModel} from '../shared/models';
import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root'
})
export class PeriodosService {

  constructor(public api: ApiService) {
  }

  getPeriodos() {
    return this.api.get('/periodos').pipe(map(data => {
      return data.periodos;
    }));
  }

  getPeriodosXEras(id_era: number) {
    return this.api.get(`/periodos?era=${id_era}`).pipe(map(data => {
      return data.periodos;
    }));
  }

  getPeriodo(id: number) {
    return this.api.get('/periodos/' + id).pipe(map(data => {
      return data.periodo;
    }));
  }

  newPeriodo(periodo: PeriodoModel) {
    return this.api.post('/periodos', {periodo});
  }

  updatePeriodo(periodo: PeriodoModel) {
    return this.api.put('/periodos/' + periodo.ID_PERIODO, {periodo});
  }

}
