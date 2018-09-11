import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';

import {UsuarioModel} from '../shared/models';
import {UserService} from '../services/user.service';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {MessageComponent} from '../shared/message/message.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public router: Router, public _usuarioService: UserService, private dialog: MatDialog) {
  }

  ngOnInit() {
  }

  openDialog(error: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title: 'Error!',
      content: `Ha ocurrido un error, ${error.error.message}`
    };
    this.dialog.open(MessageComponent, dialogConfig);
  }

  ingresar(forma: NgForm) {
    if (forma.invalid) return;
    const usuario = new UsuarioModel(forma.value.usuario, forma.value.credencial);
    this._usuarioService.login(usuario).subscribe(() => {
      this.router.navigate(['/dashboard']);
    }, err => this.openDialog(err));
  }

}
