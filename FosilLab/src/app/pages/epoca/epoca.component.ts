import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {EpocasService} from '../../services/epocas.service';
import {EpocaModel, PeriodoModel} from '../../shared/models';
import {NgForm} from '@angular/forms';
import {PeriodosService} from '../../services/periodos.service';
import {MessageComponent} from '../../shared/message/message.component';
import {MatDialog, MatDialogConfig} from '@angular/material';

@Component({
  selector: 'app-epoca',
  templateUrl: './epoca.component.html',
  styleUrls: ['./epoca.component.css']
})
export class EpocaComponent implements OnInit {

  epoca = new EpocaModel(null, null, '', '');
  update = false;

  periodos: PeriodoModel[];

  constructor(public router: Router,
              public params: ActivatedRoute,
              public _epocaService: EpocasService,
              public _periodoService: PeriodosService,
              public dialog: MatDialog) {
    this.params.params.subscribe(params => {
      const id = params['id'];
      if (id !== 'new') {
        this.getEpoca(id);
        this.update = true;
      }
    }, err => this.openDialog(err));
  }

  ngOnInit(): void {
    this.getPeriodos();
  }

  getPeriodos() {
    this._periodoService.getPeriodos().subscribe(periodos => {
      this.periodos = periodos;
    }, err => this.openDialog(err));
  }

  getEpoca(id: number) {
    this._epocaService.getEpoca(id).subscribe(epoca => {
      this.epoca = new EpocaModel(epoca.ID_EPOCA, epoca.ID_PERIODO, epoca.NOMBRE_PERIODO, epoca.NOMBRE_EPOCA);
    }, err => this.openDialog(err));
  }

  submitEpoca(forma: NgForm) {
    if (forma.invalid) return;
    if (this.update) this.updateEpoca(this.epoca);
    else this.newEpoca(this.epoca);
  }

  newEpoca(epoca: EpocaModel) {
    this._epocaService.newEpoca(epoca).subscribe(message => {
      console.log(message);
      this.router.navigate(['/epocas']);
    }, err => this.openDialog(err));
  }

  updateEpoca(epoca: EpocaModel) {
    this._epocaService.updateEpoca(epoca).subscribe(message => {
      console.log(message);
      this.router.navigate(['/epocas']);
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
