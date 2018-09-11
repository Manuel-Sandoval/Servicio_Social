import { Injectable } from '@angular/core';
import {ApiService} from './api.service';
import {MunicipioModel} from '../shared/models';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MunicipiosService {

  constructor(public api: ApiService) { }

  getMunicipios() {
    return this.api.get('/municipios').pipe(map(data => {
      return data.municipios;
    }));
  }

  getMunicipiosXEstado(id_estado: number) {
    return this.api.get(`/municipios?estado=${id_estado}`).pipe(map(data => {
      return data.municipios;
    }));
  }

  getMunicipio(id: number) {
    return this.api.get('/municipios/' + id).pipe(map(data => {
      return data.municipio;
    }));
  }

  newMunicipio(municipio: MunicipioModel) {
    return this.api.post('/municipios', {municipio});
  }

  updateMunicipio(municipio: MunicipioModel) {
    return this.api.put('/municipios/' + municipio.ID_MUNICIPIO, {municipio});
  }
}
