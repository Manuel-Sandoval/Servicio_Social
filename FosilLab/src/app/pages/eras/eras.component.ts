import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ErasService} from '../../services/eras.service';
import {EraModel} from '../../shared/models';
import {MessageComponent} from '../../shared/message/message.component';

@Component({
  selector: 'app-eras',
  templateUrl: './eras.component.html',
  styleUrls: ['./eras.component.css']
})
export class ErasComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  eras: MatTableDataSource<EraModel>;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['NOMBRE_EON', 'NOMBRE_ERA', 'actions']; // mostrar el id es irrelevante

  constructor(public _eraService: ErasService, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.getEras();
  }

  getEras() {
    this._eraService.getEras().subscribe(eras => {
      this.eras = new MatTableDataSource<EraModel>(eras);
      this.eras.paginator = this.paginator;
      this.eras.sort = this.sort;
    }, err => this.openDialog(err));
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.eras.filter = filterValue;
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
