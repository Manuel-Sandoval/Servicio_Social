import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {EonesService} from '../../services/eones.service';
import {MessageComponent} from '../../shared/message/message.component';
import {EonModel, EpocaModel, EraModel, EstadoModel, FosilModel, MunicipioModel, PaisModel, PeriodoModel} from '../../shared/models';
import {NgForm} from '@angular/forms';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {ErasService} from '../../services/eras.service';
import {MunicipiosService} from '../../services/municipios.service';
import {FosilesService} from '../../services/fosiles.service';
import {PaisesService} from '../../services/paises.service';
import {EstadosService} from '../../services/estados.service';
import {PeriodosService} from '../../services/periodos.service';
import {EpocasService} from '../../services/epocas.service';

@Component({
  selector: 'app-fosil',
  templateUrl: './fosil.component.html',
  styleUrls: ['./fosil.component.css']
})
export class FosilComponent implements OnInit {

  fosil = new FosilModel(null, '', '', '', null, '', null, '',
    null, '', null, '', null, '', null, '', null,
    '', null, '', '', null);
  update = false;

  paises: PaisModel[] = [];
  estados: EstadoModel[] = [];
  municipios: MunicipioModel[] = [];
  eones: EonModel[] = [];
  eras: EraModel[] = [];
  periodos: PeriodoModel[] = [];
  epocas: EpocaModel[] = [];

  constructor(public router: Router,
              public params: ActivatedRoute,
              public _fosilService: FosilesService,
              public _paisService: PaisesService,
              public _estadoService: EstadosService,
              public _municipioService: MunicipiosService,
              public _eonService: EonesService,
              public _eraService: ErasService,
              public _periodoService: PeriodosService,
              public _epocaService: EpocasService,
              public dialog: MatDialog) {
    this.params.params.subscribe(params => {
      const id = params['id'];
      if (id !== 'new') {
        this.getFosil(id);
        this.update = true;
      }
    }, err => this.openDialog(err));
  }

  ngOnInit() {
    this.getPaises();
    this.getEones();
  }

  getPaises() {
    this._paisService.getPaises().subscribe(paises => {
      this.paises = paises;
    }, err => this.openDialog(err));
  }

  getEstados(id_pais: number) {
    this._estadoService.getEstadosXPais(id_pais).subscribe(estados => {
      this.estados = estados;
    }, err => this.openDialog(err));
  }

  getMunicipios(id_estado: number) {
    this._municipioService.getMunicipiosXEstado(id_estado).subscribe(municipios => {
      this.municipios = municipios;
    }, err => this.openDialog(err));
  }

  getEones() {
    this._eonService.getEones().subscribe(eones => {
      this.eones = eones;
      this.eras = [];
      this.periodos = [];
      this.epocas = [];
    }, err => this.openDialog(err));
  }

  getEras(id_eon: number) {
    this._eraService.getErasXEones(id_eon).subscribe(eras => {
      this.eras = eras;
      this.periodos = [];
      this.epocas = [];
    }, err => this.openDialog(err));
  }

  getPeriodos(id_era: number) {
    this._periodoService.getPeriodosXEras(id_era).subscribe(periodos => {
      this.periodos = periodos;
      this.epocas = [];
    }, err => this.openDialog(err));
  }

  getEpocas(id_periodo: number) {
    this._epocaService.getEpocasXPeriodo(id_periodo).subscribe(epocas => {
      this.epocas = epocas;
    }, err => this.openDialog(err));
  }

  getFosil(id: number) {
    this._fosilService.getFosil(id).subscribe(fosil => {
      this.fosil = new FosilModel(
        fosil.ID_FOSIL,
        fosil.MUESTRA,
        fosil.GRUPO,
        fosil.NOMBRE,
        fosil.ID_PAIS,
        fosil.NOMBRE_PAIS,
        fosil.ID_ESTADO,
        fosil.NOMBRE_ESTADO,
        fosil.ID_MUNICIPIO,
        fosil.NOMBRE_MUNICIPIO,
        fosil.ID_EON,
        fosil.NOMBRE_EON,
        fosil.ID_ERA,
        fosil.NOMBRE_ERA,
        fosil.ID_EPOCA,
        fosil.NOMBRE_EPOCA,
        fosil.ID_PERIODO,
        fosil.NOMBRE_PERIODO,
        fosil.ID_ALTA,
        fosil.USUARIO_ALTA,
        fosil.FORMACION,
        fosil.COMENTARIOS,
        fosil.ID_MODIF,
        fosil.USUARIO_MODIFICA);

      this.getEstados(this.fosil.ID_PAIS);
      this.getMunicipios(this.fosil.ID_ESTADO);
      this.getEras(this.fosil.ID_EON);
      this.getPeriodos(this.fosil.ID_ERA);
      this.getEpocas(this.fosil.ID_PERIODO);

    }, err => this.openDialog(err));
  }

  submitFosil(forma: NgForm) {
    if (forma.invalid) return;
    if (this.update) this.updateFosil(this.fosil);
    else this.newFosil(this.fosil);
  }

  newFosil(fosil: FosilModel) {
    this._fosilService.newFosil(fosil).subscribe(message => {
      console.log(message);
      this.router.navigate(['/dashboard']);
    }, err => this.openDialog(err));
  }

  updateFosil(fosil: FosilModel) {
    this._fosilService.updateFosil(fosil).subscribe(message => {
      console.log(message);
      this.router.navigate(['/dashboard']);
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
