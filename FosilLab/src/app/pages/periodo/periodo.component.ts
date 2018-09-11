import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PeriodosService} from '../../services/periodos.service';
import {MessageComponent} from '../../shared/message/message.component';
import {EraModel, PeriodoModel} from '../../shared/models';
import {NgForm} from '@angular/forms';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {ErasService} from '../../services/eras.service';

@Component({
  selector: 'app-periodo',
  templateUrl: './periodo.component.html',
  styleUrls: ['./periodo.component.css']
})
export class PeriodoComponent implements OnInit {

  periodo = new PeriodoModel(null, '', null, '');
  update = false;

  eras: EraModel[];

  constructor(public router: Router,
              public params: ActivatedRoute,
              public _eraService: ErasService,
              public _periodoService: PeriodosService,
              public dialog: MatDialog) {
    this.params.params.subscribe(params => {
      const id = params['id'];
      if (id !== 'new') {
        this.getPeriodo(id);
        this.update = true;
      }
    }, err => this.openDialog(err));
  }

  ngOnInit(): void {
    this.getEras();
  }

  getEras() {
    this._eraService.getEras().subscribe(eras => {
      this.eras = eras;
    }, err => this.openDialog(err));
  }

  getPeriodo(id: number) {
    this._periodoService.getPeriodo(id).subscribe(periodo => {
      this.periodo = new PeriodoModel(periodo.ID_ERA, periodo.NOMBRE_ERA, periodo.ID_PERIODO, periodo.NOMBRE_PERIODO);
    }, err => this.openDialog(err));
  }

  submitPeriodo(forma: NgForm) {
    if (forma.invalid) return;
    if (this.update) this.updatePeriodo(this.periodo);
    else this.newPeriodo(this.periodo);
  }

  newPeriodo(periodo: PeriodoModel) {
    this._periodoService.newPeriodo(periodo).subscribe(message => {
      this.router.navigate(['/periodos']);
    }, err => this.openDialog(err));
  }

  updatePeriodo(periodo: PeriodoModel) {
    this._periodoService.updatePeriodo(periodo).subscribe(message => {
      this.router.navigate(['/periodos']);
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
