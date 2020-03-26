import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-confirmation-dialog',
    templateUrl: './confirmacion-dialogo.component.html',
    styleUrls: ['./confirmacion-dialogo.component.css']
 })
 export class ConfirmacionDialogoComponent {

     constructor(public dialogRef: MatDialogRef<ConfirmacionDialogoComponent>,
         @Inject(MAT_DIALOG_DATA) public message: string) { }

     onNoClick(): void {
         this.dialogRef.close();
     }
 }
