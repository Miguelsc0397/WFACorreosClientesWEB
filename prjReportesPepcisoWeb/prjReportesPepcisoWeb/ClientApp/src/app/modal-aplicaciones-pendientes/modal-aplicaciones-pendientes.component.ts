import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
    opcion: string;
}

@Component({
  selector: 'app-modal-aplicaciones-pendientes',
  templateUrl: './modal-aplicaciones-pendientes.component.html',
  styleUrls: ['./modal-aplicaciones-pendientes.component.scss']
})
export class ModalAplicacionesPendientesComponent implements OnInit {

    constructor(public dialogRef: MatDialogRef<ModalAplicacionesPendientesComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
  }

}