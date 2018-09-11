import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

import {MessageComponent} from '../../shared/message/message.component';

import {UsuarioModel} from '../../shared/models';
import {UsersService} from '../../services/users.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  usuarios: MatTableDataSource<UsuarioModel>;
  excelData: any[];

  displayedColumns = ['ID_USUARIO', 'USUARIO', 'ACTIVO', 'USUARIO_ROOT', 'actions'];

  constructor(public _usuarioService: UsersService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this._usuarioService.getUsers().subscribe(usuarios => {
      this.usuarios = new MatTableDataSource<UsuarioModel>(usuarios);
      this.usuarios.paginator = this.paginator;
      this.usuarios.sort = this.sort;
      this.excelData = usuarios;
    }, err => this.openDialog(err));
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.usuarios.filter = filterValue;
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
