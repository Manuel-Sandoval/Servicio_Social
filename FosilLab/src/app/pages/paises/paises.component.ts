import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {PaisesService} from '../../services/paises.service';
import {PaisModel} from '../../shared/models';
import {MessageComponent} from '../../shared/message/message.component';

@Component({
  selector: 'app-paises',
  templateUrl: './paises.component.html',
  styleUrls: ['./paises.component.css']
})
export class PaisesComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  paises: MatTableDataSource<PaisModel>;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['NOMBRE', 'actions']; // mostrar el id es irrelevante

  constructor(public _paisService: PaisesService, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.getPaises();
  }

  getPaises() {
    this._paisService.getPaises().subscribe(paises => {
      this.paises = new MatTableDataSource<PaisModel>(paises);
      this.paises.paginator = this.paginator;
      this.paises.sort = this.sort;
    }, err => this.openDialog(err));
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.paises.filter = filterValue;
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
