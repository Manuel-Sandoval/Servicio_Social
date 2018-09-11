import {Injectable} from '@angular/core';

import {Observable, BehaviorSubject, ReplaySubject} from 'rxjs';
import {distinctUntilChanged, map} from 'rxjs/operators';

import {ApiService} from './api.service';
import {UsuarioModel} from '../shared/models';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private currentUserSubject = new BehaviorSubject<UsuarioModel>({} as UsuarioModel);
  public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = false;

  constructor(
    private apiService: ApiService
  ) {
    this.isAuthenticatedSubject.next(false);
    this.isAuthenticatedSubject.subscribe(res => {
      this.isAuthenticated = res;
    });
  }

  setAuth(usuario: UsuarioModel) {
    sessionStorage.setItem('usuario', JSON.stringify(usuario));
    this.currentUserSubject.next(usuario);
    this.isAuthenticatedSubject.next(true);
  }

  purgeAuth() {
    sessionStorage.removeItem('usuario');
    this.currentUserSubject.next({} as UsuarioModel);
    this.isAuthenticatedSubject.next(false);
  }

  login(credentials: UsuarioModel): Observable<UsuarioModel> {
    return this.apiService.post('/login', {user: credentials})
      .pipe(map(
        data => {
          this.setAuth(data.usuario);
          return data;
        }
      ));
  }

  getCurrentUser(): UsuarioModel {
    return this.currentUserSubject.value;
  }
}
