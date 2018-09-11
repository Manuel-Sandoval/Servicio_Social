import { Component, OnInit } from '@angular/core';
import {EstadoModel, PaisModel} from '../../shared/models';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {EstadosService} from '../../services/estados.service';
import {PaisesService} from '../../services/paises.service';
import {MessageComponent} from '../../shared/message/message.component';
import {MatDialog, MatDialogConfig} from '@angular/material';

@Component({
  selector: 'app-estado',
  templateUrl: './estado.component.html',
  styleUrls: ['./estado.component.css']
})
export class EstadoComponent implements OnInit {

  estado = new EstadoModel(null, '', null, '');
  update = false;

  paises: PaisModel[];

  constructor(public router: Router,
              public params: ActivatedRoute,
              public _estadoService: EstadosService,
              public _paisService: PaisesService,
              public dialog: MatDialog) {
    this.params.params.subscribe(params => {
      const id = params['id'];
      if (id !== 'new') {
        this.getEstado(id);
        this.update = true;
      }
    }, err => this.openDialog(err));
  }

  ngOnInit(): void {
    this.getPaises();
  }

  getPaises() {
    this._paisService.getPaises().subscribe(paises => {
      this.paises = paises;
    }, err => this.openDialog(err));
  }

  getEstado(id: number) {
    this._estadoService.getEstado(id).subscribe(estado => {
      this.estado = new EstadoModel(estado.ID_PAIS, estado.NOMBRE_PAIS, estado.ID_ESTADO, estado.NOMBRE_ESTADO);
    }, err => this.openDialog(err));
  }

  submitEstado(forma: NgForm) {
    if (forma.invalid) return;
    if (this.update) this.updateEstado(this.estado);
    else this.newEstado(this.estado);
  }

  newEstado(estado: EstadoModel) {
    this._estadoService.newEstado(estado).subscribe(message => {
      console.log(message);
      this.router.navigate(['/estados']);
    }, err => this.openDialog(err));
  }

  updateEstado(estado: EstadoModel) {
    this._estadoService.updateEstado(estado).subscribe(message => {
      console.log(message);
      this.router.navigate(['/estados']);
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
