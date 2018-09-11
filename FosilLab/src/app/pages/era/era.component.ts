import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {EonModel, EraModel} from '../../shared/models';
import {ErasService} from '../../services/eras.service';
import {EonesService} from '../../services/eones.service';
import {MessageComponent} from '../../shared/message/message.component';
import {MatDialog, MatDialogConfig} from '@angular/material';

@Component({
  selector: 'app-era',
  templateUrl: './era.component.html',
  styleUrls: ['./era.component.css']
})
export class EraComponent implements OnInit {

  era = new EraModel(null, '', null, '');
  update = false;

  eones: EonModel[];

  constructor(public router: Router,
              public params: ActivatedRoute,
              public _eraService: ErasService,
              public _eonService: EonesService,
              public dialog: MatDialog) {
    this.params.params.subscribe(params => {
      const id = params['id'];
      if (id !== 'new') {
        this.getEra(id);
        this.update = true;
      }
    }, err => this.openDialog(err));
  }

  ngOnInit(): void {
    this.getEones();
  }

  getEones() {
    this._eonService.getEones().subscribe(eones => {
      this.eones = eones;
    }, err => this.openDialog(err));
  }

  getEra(id: number) {
    this._eraService.getEra(id).subscribe(era => {
      this.era = new EraModel(era.ID_EON, era.NOMBRE_EON, era.ID_ERA, era.NOMBRE_ERA);
    }, err => this.openDialog(err));
  }

  submitEra(forma: NgForm) {
    if (forma.invalid) return;
    if (this.update) this.updateEra(this.era);
    else this.newEra(this.era);
  }

  newEra(era: EraModel) {
    this._eraService.newEra(era).subscribe(message => {
      console.log(message);
      this.router.navigate(['/eras']);
    }, err => this.openDialog(err));
  }

  updateEra(era: EraModel) {
    this._eraService.updateEra(era).subscribe(message => {
      console.log(message);
      this.router.navigate(['/eras']);
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
