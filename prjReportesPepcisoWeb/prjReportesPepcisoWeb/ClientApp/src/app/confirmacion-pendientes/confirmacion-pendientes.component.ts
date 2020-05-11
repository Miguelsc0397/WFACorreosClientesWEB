import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotifierService } from 'angular-notifier';
import { DataPendiente } from '../../models/datapendiente';
import { FacturasRFCService } from '../services/facturasrfc.service';
declare var $: any;

export interface DialogData {
    opcion: string;
}

@Component({
  selector: 'app-confirmacion-pendientes',
  templateUrl: './confirmacion-pendientes.component.html',
  styleUrls: ['./confirmacion-pendientes.component.scss']
})
export class ConfirmacionPendientesComponent implements OnInit {
    private notifier: NotifierService;
    public parametros: DataPendiente = new DataPendiente;

    constructor(public dialogRef: MatDialogRef<ConfirmacionPendientesComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData, notifier: NotifierService, private _facturasrfcService: FacturasRFCService) {
        this.notifier = notifier;
    }

    showNotification(from, align, message, color) {
        const type = ['', 'info', 'success', 'warning', 'danger'];

        $.notify({
            icon: "pe-7s-check",
            message: message
        }, {
            type: color,
            timer: 1000,
            placement: {
                from: from,
                align: align
            }
        });
    }


  ngOnInit() {
  }

    opcionSi() {
        this.parametros.opcion = this.data.opcion;

        this._facturasrfcService.confirmPendiente(this.parametros)
            .subscribe((response: number) => {
                if (response == 1) {
                    this.showNotification('top', 'right', 'Se TERMIN&Oacute; la Aplicaci&oacute;n pendiente del Cliente', 'success');
                    this.dialogRef.close();
                }
                
            }, error => console.error(error));
    }

}
