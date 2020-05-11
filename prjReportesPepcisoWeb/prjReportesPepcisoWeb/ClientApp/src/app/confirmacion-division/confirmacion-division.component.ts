import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { FacturasRFCService } from '../services/facturasrfc.service';
import { DataDivision } from '../../models/datadivision';
import { MensajeCambiodivisionComponent } from '../mensaje-cambiodivision/mensaje-cambiodivision.component';

export interface DialogData {
    division: string;
    cliente: string;
    rfc: string;
    seleccionados: any;
}

@Component({
  selector: 'app-confirmacion-division',
  templateUrl: './confirmacion-division.component.html',
  styleUrls: ['./confirmacion-division.component.scss']
})
export class ConfirmacionDivisionComponent implements OnInit {
    public datadivision: DataDivision;

    constructor(public dialogRef: MatDialogRef<ConfirmacionDivisionComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData, private _facturasrfcService: FacturasRFCService,
        public dialog: MatDialog) { }

    ngOnInit() {


    }

    opcionSi() {
        console.log(this.data);
        this.datadivision = new DataDivision;
        this.datadivision.cliente = this.data.cliente;
        this.datadivision.division = this.data.division;
        this.datadivision.rfc = this.data.rfc;
        this.datadivision.filial = "MET";
        this.datadivision.sucursal = "010";
        this.datadivision.selectedrows = this.data.seleccionados;

        this._facturasrfcService.actualizaDiv(this.datadivision)
            .subscribe((data: number) => {

                if (data == 1) {
                    this.dialogRef.close();
                    const dialogRef = this.dialog.open(MensajeCambiodivisionComponent, {
                        width: '530px',
                        data: {

                        }
                    });
                }

            }, error => console.error(error));
        
    }

    opcionNo() {
        this.dialogRef.close();
    }

}
