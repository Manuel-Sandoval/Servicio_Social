import { Component, OnInit } from '@angular/core';
import {MunicipiosService} from '../../services/municipios.service';
import {EstadoModel, MunicipioModel} from '../../shared/models';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {EstadosService} from '../../services/estados.service';
import {MessageComponent} from '../../shared/message/message.component';
import {MatDialog, MatDialogConfig} from '@angular/material';

@Component({
  selector: 'app-municipio',
  templateUrl: './municipio.component.html',
  styleUrls: ['./municipio.component.css']
})
export class MunicipioComponent implements OnInit {

  municipio = new MunicipioModel(null, '', null, '');
  update = false;

  estados: EstadoModel[];

  constructor(public router: Router,
              public params: ActivatedRoute,
              public _estadoService: EstadosService,
              public _municipioService: MunicipiosService,
              public dialog: MatDialog) {
    this.params.params.subscribe(params => {
      const id = params['id'];
      if (id !== 'new') {
        this.getMunicipio(id);
        this.update = true;
      }
    }, err => this.openDialog(err));
  }

  ngOnInit(): void {
    this.getEstados();
  }

  getEstados() {
    this._estadoService.getEstados().subscribe(estados => {
      this.estados = estados;
    }, err => this.openDialog(err));
  }

  getMunicipio(id: number) {
    this._municipioService.getMunicipio(id).subscribe(municipio => {
      this.municipio = new MunicipioModel(municipio.ID_ESTADO, municipio.NOMBRE_ESTADO, municipio.ID_MUNICIPIO, municipio.NOMBRE_MUNICIPIO);
    }, err => this.openDialog(err));
  }

  submitMunicipio(forma: NgForm) {
    if (forma.invalid) return;
    if (this.update) this.updateMunicipio(this.municipio);
    else this.newMunicipio(this.municipio);
  }

  newMunicipio(municipio: MunicipioModel) {
    this._municipioService.newMunicipio(municipio).subscribe(message => {
      console.log(message);
      this.router.navigate(['/municipios']);
    }, err => this.openDialog(err));
  }

  updateMunicipio(municipio: MunicipioModel) {
    this._municipioService.updateMunicipio(municipio).subscribe(message => {
      console.log(message);
      this.router.navigate(['/municipios']);
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
