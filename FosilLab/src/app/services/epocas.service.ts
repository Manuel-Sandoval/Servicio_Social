import { Injectable } from '@angular/core';
import {EpocaModel} from '../shared/models';
import {map} from 'rxjs/operators';
import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root'
})
export class EpocasService {

  constructor(public api: ApiService) {
  }

  getEpocas() {
    return this.api.get('/epocas').pipe(map(data => {
      return data.epocas;
    }));
  }

  getEpocasXPeriodo(id_periodo: number) {
    return this.api.get(`/epocas?periodo=${id_periodo}`).pipe(map(data => {
      return data.epocas;
    }));
  }

  getEpoca(id: number) {
    return this.api.get('/epocas/' + id).pipe(map(data => {
      return data.epoca;
    }));
  }

  newEpoca(epoca: EpocaModel) {
    return this.api.post('/epocas', {epoca});
  }

  updateEpoca(epoca: EpocaModel) {
    return this.api.put('/epocas/' + epoca.ID_EPOCA, {epoca});
  }

}
