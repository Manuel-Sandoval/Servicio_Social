import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {EonModel} from '../../shared/models';
import {EonesService} from '../../services/eones.service';
import {MessageComponent} from '../../shared/message/message.component';

@Component({
  selector: 'app-eones',
  templateUrl: './eones.component.html',
  styleUrls: ['./eones.component.css']
})
export class EonesComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  eones: MatTableDataSource<EonModel>;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['NOMBRE', 'actions']; // mostrar el id es irrelevante

  constructor(public _eonService: EonesService, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.getEones();
  }

  getEones() {
    this._eonService.getEones().subscribe(eones => {
      this.eones = new MatTableDataSource<EonModel>(eones);
      this.eones.paginator = this.paginator;
      this.eones.sort = this.sort;
    }, err => this.openDialog(err));
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.eones.filter = filterValue;
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
