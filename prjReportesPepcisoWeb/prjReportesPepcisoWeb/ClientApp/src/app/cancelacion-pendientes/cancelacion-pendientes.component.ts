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
  selector: 'app-cancelacion-pendientes',
  templateUrl: './cancelacion-pendientes.component.html',
  styleUrls: ['./cancelacion-pendientes.component.scss']
})
export class CancelacionPendientesComponent implements OnInit {
    private notifier: NotifierService;
    public parametros: DataPendiente = new DataPendiente;

    constructor(public dialogRef: MatDialogRef<CancelacionPendientesComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData, notifier: NotifierService, private _facturasrfcService: FacturasRFCService) { }

    showNotification(from, align, message, color) {
        const type = ['', 'info', 'success', 'warning', 'danger'];

        $.notify({
            icon: "pe-7s-close-circle",
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

        this._facturasrfcService.cancelPendiente(this.parametros)
            .subscribe((response: number) => {
                if (response == 1) {
                    this.showNotification('top', 'right', 'Se CANCEL&Oacute; la Aplicaci&oacute;n pendiente del Cliente', 'success');
                    this.dialogRef.close();
                }

            }, error => console.error(error));
    }

}
