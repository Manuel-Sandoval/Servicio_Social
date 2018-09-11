import { Injectable } from '@angular/core';
import {ApiService} from './api.service';
import {EstadoModel} from '../shared/models';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EstadosService {

  constructor(public api: ApiService) { }

  getEstados() {
    return this.api.get('/estados').pipe(map(data => {
      return data.estados;
    }));
  }

  getEstadosXPais(id_pais: number) {
    return this.api.get(`/estados?pais=${id_pais}`).pipe(map(data => {
      return data.estados;
    }));
  }

  getEstado(id: number) {
    return this.api.get('/estados/' + id).pipe(map(data => {
      return data.estado;
    }));
  }

  newEstado(estado: EstadoModel) {
    return this.api.post('/estados', {estado});
  }

  updateEstado(estado: EstadoModel) {
    return this.api.put('/estados/' + estado.ID_ESTADO, {estado});
  }
}
