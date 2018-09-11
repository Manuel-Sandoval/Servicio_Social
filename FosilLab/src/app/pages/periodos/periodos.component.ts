import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {PeriodoModel} from '../../shared/models';
import {PeriodosService} from '../../services/periodos.service';
import {MessageComponent} from '../../shared/message/message.component';

@Component({
  selector: 'app-periodos',
  templateUrl: './periodos.component.html',
  styleUrls: ['./periodos.component.css']
})
export class PeriodosComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  periodos: MatTableDataSource<PeriodoModel>;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['NOMBRE_ERA', 'NOMBRE_PERIODO', 'actions']; // mostrar el id es irrelevante

  constructor(public _periodoService: PeriodosService, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.getPeriodos();
  }

  getPeriodos() {
    this._periodoService.getPeriodos().subscribe(periodos => {
      this.periodos = new MatTableDataSource<PeriodoModel>(periodos);
      this.periodos.paginator = this.paginator;
      this.periodos.sort = this.sort;
    }, err => this.openDialog(err));
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.periodos.filter = filterValue;
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
