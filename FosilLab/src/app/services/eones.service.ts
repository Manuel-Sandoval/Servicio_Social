import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {EonModel} from '../shared/models';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EonesService {

  constructor(public api: ApiService) { }

  getEones() {
    return this.api.get('/eones').pipe(map(data => {
      console.log(data);
      return data.eones;
    }));
  }

  getEon(id: number) {
    return this.api.get('/eones/' + id).pipe(map(data => {
      return data.eon;
    }));
  }

  newEon(eon: EonModel) {
    return this.api.post('/eones', {eon});
  }

  updateEon(eon: EonModel) {
    return this.api.put('/eones/' + eon.ID_EON, {eon});
  }

}
