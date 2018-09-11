import { Component } from '@angular/core';
import {NgForm} from '@angular/forms';
import {EonModel} from '../../shared/models';
import {ActivatedRoute, Router} from '@angular/router';
import {EonesService} from '../../services/eones.service';
import {MessageComponent} from '../../shared/message/message.component';
import {MatDialog, MatDialogConfig} from '@angular/material';


@Component({
  selector: 'app-eon',
  templateUrl: './eon.component.html',
  styleUrls: ['./eon.component.css']
})
export class EonComponent {

  eon = new EonModel(null, '');
  update = false;

  constructor(public router: Router, public params: ActivatedRoute, public _eonService: EonesService, public dialog: MatDialog) {
    this.params.params.subscribe(params => {
      const id = params['id'];
      if (id !== 'new') {
        this.getEon(id);
        this.update = true;
      }
    }, err => this.openDialog(err));
  }

  getEon(id: number) {
    this._eonService.getEon(id).subscribe(eon => {
      this.eon = new EonModel(eon.ID_EON, eon.NOMBRE);
    }, err => this.openDialog(err));
  }

  submitEon(forma: NgForm) {
    if (forma.invalid) return;
    if (this.update) this.updateEon(this.eon);
    else this.newEon(this.eon);
  }

  newEon(eon: EonModel) {
    this._eonService.newEon(eon).subscribe(message => {
      console.log(message);
      this.router.navigate(['/eones']);
    }, err => this.openDialog(err));
  }

  updateEon(eon: EonModel) {
    this._eonService.updateEon(eon).subscribe(message => {
      console.log(message);
      this.router.navigate(['/eones']);
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
