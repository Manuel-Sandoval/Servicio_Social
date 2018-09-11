import {Injectable} from '@angular/core';
import {FosilModel} from '../shared/models';
import {ApiService} from './api.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FosilesService {

  constructor(public api: ApiService) {
  }

  getFosiles() {
    return this.api.get('/fosiles').pipe(map(data => {
      return data.fosiles;
    }));
  }

  getFosil(id: number) {
    return this.api.get('/fosiles/' + id).pipe(map(data => {
      return data.fosil;
    }));
  }

  newFosil(fosil: FosilModel) {
    return this.api.post('/fosiles', {fosil});
  }

  updateFosil(fosil: FosilModel) {
    return this.api.put('/fosiles/' + fosil.ID_FOSIL, {fosil});
  }

  deleteFosil(fosil: FosilModel) {
    return this.api.delete('/fosiles/' + fosil.ID_FOSIL);
  }

}
