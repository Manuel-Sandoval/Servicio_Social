import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {UsuarioModel} from '../../shared/models';
import {UsersService} from '../../services/users.service';
import {NgForm} from '@angular/forms';
import {MessageComponent} from '../../shared/message/message.component';
import {MatDialog, MatDialogConfig} from '@angular/material';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent {

  usuario = new UsuarioModel('', '', null, 1, 0);
  update = false;

  constructor(public router: Router, public params: ActivatedRoute, public _usuarioService: UsersService, public dialog: MatDialog) {
    this.params.params.subscribe(params => {
      const id = params['id'];
      if (id !== 'new') {
        this.getUser(id);
        this.update = true;
      }
    }, err => this.openDialog(err));
  }

  getUser(id: number) {
    this._usuarioService.getUser(id).subscribe(usuario => {
      this.usuario = new UsuarioModel(usuario.USUARIO, '', usuario.ID_USUARIO, usuario.ACTIVO, usuario.USUARIO_ROOT);
    }, err => this.openDialog(err));
  }

  submitUser(forma: NgForm) {
    if (forma.invalid) return;
    if (this.update) this.updateUser(this.usuario);
    else this.newUser(this.usuario);
  }

  newUser(usuario: UsuarioModel) {
    this._usuarioService.newUser(usuario).subscribe(message => {
      console.log(message);
      this.router.navigate(['/usuarios']);
    }, err => this.openDialog(err));
  }

  updateUser(usuario: UsuarioModel) {
    if (usuario.CREDENCIAL == '' || usuario.CREDENCIAL == null) delete usuario.CREDENCIAL;
    this._usuarioService.updateUser(usuario).subscribe(message => {
      console.log(message);
      this.router.navigate(['/usuarios']);
    }, err => this.openDialog(err));
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

}
