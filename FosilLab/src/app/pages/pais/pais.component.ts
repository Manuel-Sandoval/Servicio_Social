import { Component } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {PaisModel} from '../../shared/models';
import {PaisesService} from '../../services/paises.service';
import {MessageComponent} from '../../shared/message/message.component';
import {MatDialog, MatDialogConfig} from '@angular/material';

@Component({
  selector: 'app-pais',
  templateUrl: './pais.component.html',
  styleUrls: ['./pais.component.css']
})
export class PaisComponent {

  pais = new PaisModel(null, '');
  update = false;

  constructor(public router: Router, public params: ActivatedRoute, public _paisService: PaisesService, public dialog: MatDialog) {
    this.params.params.subscribe(params => {
      const id = params['id'];
      if (id !== 'new') {
        this.getPais(id);
        this.update = true;
      }
    }, err => this.openDialog(err));
  }

  getPais(id: number) {
    this._paisService.getPais(id).subscribe(pais => {
      this.pais = new PaisModel(pais.ID_PAIS, pais.NOMBRE);
    });
  }

  submitPais(forma: NgForm) {
    if (forma.invalid) return;
    if (this.update) this.updatePais(this.pais);
    else this.newPais(this.pais);
  }

  newPais(pais: PaisModel) {
    this._paisService.newPais(pais).subscribe(message => {
      console.log(message);
      this.router.navigate(['/paises']);
    }, err => this.openDialog(err));
  }

  updatePais(pais: PaisModel) {
    this._paisService.updatePais(pais).subscribe(message => {
      console.log(message);
      this.router.navigate(['/paises']);
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
