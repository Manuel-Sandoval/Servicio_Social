import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {map} from 'rxjs/operators';
import {EraModel} from '../shared/models';

@Injectable({
  providedIn: 'root'
})
export class ErasService {

  constructor(public api: ApiService) {
  }

  getEras() {
    return this.api.get('/eras').pipe(map(data => {
      return data.eras;
    }));
  }

  getErasXEones(id_eon: number) {
    return this.api.get(`/eras?eon=${id_eon}`).pipe(map(data => {
      return data.eras;
    }));
  }

  getEra(id: number) {
    return this.api.get('/eras/' + id).pipe(map(data => {
      return data.era;
    }));
  }

  newEra(era: EraModel) {
    return this.api.post('/eras', {era});
  }

  updateEra(era: EraModel) {
    return this.api.put('/eras/' + era.ID_ERA, {era});
  }

}
