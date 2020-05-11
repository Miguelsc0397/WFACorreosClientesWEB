import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotifierService } from 'angular-notifier';
declare var $: any;

export interface DialogData {
    opcion: string;
}

@Component({
  selector: 'app-modal-aplicaciones-pendientes',
  templateUrl: './modal-aplicaciones-pendientes.component.html',
  styleUrls: ['./modal-aplicaciones-pendientes.component.scss']
})
export class ModalAplicacionesPendientesComponent implements OnInit {
    private notifier: NotifierService;

    constructor(public dialogRef: MatDialogRef<ModalAplicacionesPendientesComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData, notifier: NotifierService, public dialog: MatDialog) {
        this.notifier = notifier;
    }

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


}