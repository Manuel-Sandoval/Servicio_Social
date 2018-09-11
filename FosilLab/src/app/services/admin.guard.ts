import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';
import {UserService} from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(public user: UserService) {
  }

  canActivate() {
    return this.user.getCurrentUser().USUARIO_ROOT === 1;
  }
}
