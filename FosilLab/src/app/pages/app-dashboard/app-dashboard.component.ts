import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {MessageComponent} from '../../shared/message/message.component';
import {FosilModel, FosilExcelModel} from '../../shared/models';
import {FosilesService} from '../../services/fosiles.service';

import * as XLSX from 'xlsx';

import {map} from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './app-dashboard.component.html',
  styleUrls: ['./app-dashboard.component.css']
})
export class AppDashboardComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  fosiles: MatTableDataSource<FosilModel>;
  excelData: FosilExcelModel[] = [];

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['MUESTRA', 'GRUPO', 'NOMBRE', 'FORMACION', 'NOMBRE_MUNICIPIO', 'NOMBRE_EPOCA', 'COMENTARIOS', 'actions'];

  constructor(public _fosilService: FosilesService, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.getFosiles();
  }

  getFosiles() {
    this._fosilService.getFosiles().subscribe(fosiles => {
      this.fosiles = new MatTableDataSource<FosilModel>(fosiles);
      this.fosiles.paginator = this.paginator;
      this.fosiles.sort = this.sort;
      this.excelData = fosiles.map((fosil: FosilModel) => {
        const fosilExcel: FosilExcelModel = {
          NoFosil: fosil.ID_EON,
          Muestra: fosil.MUESTRA,
          Grupo: fosil.GRUPO,
          Nombre: fosil.NOMBRE,
          Pais: fosil.NOMBRE_PAIS,
          Estado: fosil.NOMBRE_ESTADO,
          Municipio: fosil.NOMBRE_MUNICIPIO,
          Formacion: fosil.FORMACION,
          Eon: fosil.NOMBRE_EON,
          Era: fosil.NOMBRE_ERA,
          Periodo: fosil.NOMBRE_PERIODO,
          Epoca: fosil.NOMBRE_EPOCA,
          Comentarios: fosil.COMENTARIOS,
          Usuario_Alta: fosil.USUARIO_ALTA,
          Usuario_Modifico: fosil.USUARIO_MODIFICA
        };
        return fosilExcel;
      });
    }, err => this.openDialog(err));
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.fosiles.filter = filterValue;
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

  generateExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.excelData);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Fosiles');

    /* save to file */
    XLSX.writeFile(wb, 'Fosiles.xlsx');
  }

}
