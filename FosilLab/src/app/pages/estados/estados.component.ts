import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {EstadoModel} from '../../shared/models';
import {EstadosService} from '../../services/estados.service';
import {MessageComponent} from '../../shared/message/message.component';

@Component({
  selector: 'app-estados',
  templateUrl: './estados.component.html',
  styleUrls: ['./estados.component.css']
})
export class EstadosComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  estados: MatTableDataSource<EstadoModel>;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['NOMBRE_PAIS', 'NOMBRE_ESTADO', 'actions']; // mostrar el id es irrelevante

  constructor(public _estadoService: EstadosService, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.getEstados();
  }

  getEstados() {
    this._estadoService.getEstados().subscribe(estados => {
      this.estados = new MatTableDataSource<EstadoModel>(estados);
      this.estados.paginator = this.paginator;
      this.estados.sort = this.sort;
    }, err => this.openDialog(err));
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.estados.filter = filterValue;
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
