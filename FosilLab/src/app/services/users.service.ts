import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {map} from 'rxjs/operators';
import {UsuarioModel} from '../shared/models';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(public api: ApiService) {
  }

  getUsers() {
    return this.api.get('/usuarios').pipe(map(data => {
      return data.usuarios;
    }));
  }

  getUser(id: number) {
    return this.api.get('/usuarios/' + id).pipe(map(data => {
      return data.usuario;
    }));
  }

  newUser(usuario: UsuarioModel) {
    return this.api.post('/usuarios', {usuario});
  }

  updateUser(usuario: UsuarioModel) {
    return this.api.put('/usuarios/' + usuario.ID_USUARIO, {usuario});
  }

}
