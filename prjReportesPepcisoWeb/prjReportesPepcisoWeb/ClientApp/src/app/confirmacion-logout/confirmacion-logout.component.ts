import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-confirmacion-logout',
  templateUrl: './confirmacion-logout.component.html',
  styleUrls: ['./confirmacion-logout.component.scss']
})
export class ConfirmacionLogoutComponent {

    constructor(private servicio: AuthenticationService, public dialogRef: MatDialogRef<ConfirmacionLogoutComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

    aceptar() {
        this.servicio.logOut();
    }

}
