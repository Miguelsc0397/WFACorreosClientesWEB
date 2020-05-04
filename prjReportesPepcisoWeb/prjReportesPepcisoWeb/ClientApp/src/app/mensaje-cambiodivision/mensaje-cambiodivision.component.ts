import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-mensaje-cambiodivision',
  templateUrl: './mensaje-cambiodivision.component.html',
  styleUrls: ['./mensaje-cambiodivision.component.scss']
})
export class MensajeCambiodivisionComponent implements OnInit {

    constructor(public dialogRef: MatDialogRef<MensajeCambiodivisionComponent>,
        @Inject(MAT_DIALOG_DATA) public dialog: MatDialog) { }

  ngOnInit() {
  }

    opcionSi() {
        this.dialogRef.close();
    }
}
