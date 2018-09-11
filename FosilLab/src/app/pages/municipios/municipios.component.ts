import {Component, OnInit, ViewChild} from '@angular/core';
import {MunicipioModel} from '../../shared/models';
import {MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {MunicipiosService} from '../../services/municipios.service';
import {MessageComponent} from '../../shared/message/message.component';

@Component({
  selector: 'app-municipios',
  templateUrl: './municipios.component.html',
  styleUrls: ['./municipios.component.css']
})
export class MunicipiosComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  municipios: MatTableDataSource<MunicipioModel>;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['NOMBRE_ESTADO', 'NOMBRE_MUNICIPIO', 'actions']; // mostrar el id es irrelevante

  constructor(public _municipioService: MunicipiosService, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.getMunicipios();
  }

  getMunicipios() {
    this._municipioService.getMunicipios().subscribe(municipios => {
      this.municipios = new MatTableDataSource<MunicipioModel>(municipios);
      this.municipios.paginator = this.paginator;
      this.municipios.sort = this.sort;
    }, err => this.openDialog(err));
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.municipios.filter = filterValue;
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
