import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {EpocaModel} from '../../shared/models';
import {EpocasService} from '../../services/epocas.service';
import {MessageComponent} from '../../shared/message/message.component';

@Component({
  selector: 'app-epocas',
  templateUrl: './epocas.component.html',
  styleUrls: ['./epocas.component.css']
})
export class EpocasComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  epocas: MatTableDataSource<EpocaModel>;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['NOMBRE_PERIODO', 'NOMBRE_EPOCA', 'actions']; // mostrar el id es irrelevante

  constructor(public _epocaService: EpocasService, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.getEpocas();
  }

  getEpocas() {
    this._epocaService.getEpocas().subscribe(epocas => {
      this.epocas = new MatTableDataSource<EpocaModel>(epocas);
      this.epocas.paginator = this.paginator;
      this.epocas.sort = this.sort;
    }, err => this.openDialog(err));
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.epocas.filter = filterValue;
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
