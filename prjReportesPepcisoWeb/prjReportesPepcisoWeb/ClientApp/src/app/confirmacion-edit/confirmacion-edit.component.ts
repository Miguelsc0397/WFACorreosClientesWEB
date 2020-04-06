import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmacion-edit',
  templateUrl: './confirmacion-edit.component.html',
  styleUrls: ['./confirmacion-edit.component.scss']
})
export class ConfirmacionEditComponent {

    constructor(public dialogRef: MatDialogRef<ConfirmacionEditComponent>,
        @Inject(MAT_DIALOG_DATA) public message: string) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

}
