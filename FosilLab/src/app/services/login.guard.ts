import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {UserService} from './user.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(public router: Router, public user: UserService) {
  }

  canActivate() {
    if (this.user.isAuthenticated) return true;
    else {
      this.router.navigate(['/login']);
      return false;
    }
  }

}
