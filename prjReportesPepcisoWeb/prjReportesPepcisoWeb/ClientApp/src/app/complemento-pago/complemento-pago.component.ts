import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientesRFC } from '../../models/clientesrfc';
import { ClientesRFCService } from '../services/clientesrfc.service';
import { FacturasRFC } from 'models/facturasrfc';
import { FacturasRFCService } from '../services/facturasrfc.service';
import { NotifierService } from 'angular-notifier';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DataPendiente } from '../../models/datapendiente';
import { ModalAplicacionesPendientesComponent } from '../modal-aplicaciones-pendientes/modal-aplicaciones-pendientes.component';
import { ConfirmacionPendientesComponent } from '../confirmacion-pendientes/confirmacion-pendientes.component';
import { CancelacionPendientesComponent } from '../cancelacion-pendientes/cancelacion-pendientes.component';
import { ConfirmacionDivisionComponent } from '../confirmacion-division/confirmacion-division.component';
import { MatDialog, MatDialogRef } from '@angular/material';
declare var $: any;

@Component({
  selector: 'app-complemento-pago',
  templateUrl: './complemento-pago.component.html',
  styleUrls: ['./complemento-pago.component.scss']
})
export class ComplementoPagoComponent implements AfterViewInit, OnDestroy, OnInit {

    @ViewChild(DataTableDirective)
    dtElement: DataTableDirective;
    private notifier: NotifierService;
    submitted = false;
    public rfcList: ClientesRFC[];
    public facturaList: FacturasRFC[];
    public facturaForm: FormGroup;
    public seleccionados: Array<FacturasRFC> = [];
    public divisionForm: FormGroup;
    selectedDay: string = '';
    @ViewChild('fondovalor') fondovalor: ElementRef;
    @ViewChild('division') division: ElementRef;
    @ViewChild('rfc') rfc: ElementRef;
    @ViewChild('content') content: any;
    display = 'none'; //default Variable
    

    dtTrigger: Subject<any> = new Subject();
    selectedUser: any;


    constructor(private formBuilder: FormBuilder, private _clientesrfcService: ClientesRFCService,
        private _facturasrfcService: FacturasRFCService, notifier: NotifierService, public dialog: MatDialog) {
        this.notifier = notifier;
    }
    isChecked = false;

    ngAfterViewInit(): void {
        this.dtTrigger.next();
    }

    ngOnDestroy(): void {
        // Do not forget to unsubscribe the event
        this.dtTrigger.unsubscribe();
    }

    rerender(): void {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            // Destroy the table first
            dtInstance.destroy();
            // Call the dtTrigger to rerender again
            this.dtTrigger.next();
        });
    }

    showNotification(from, align, message, color) {
        const type = ['', 'info', 'success', 'warning', 'danger'];

        //var color = Math.floor((Math.random() * 4) + 1);
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

    title = 'angulardatatables';
    dtOptions: DataTables.Settings = {};

    ngOnInit() {
        this._clientesrfcService.paramPago().subscribe(
            (data: ClientesRFC[]) => this.rfcList = data);

        this.divisionForm = this.formBuilder.group({
            cliente: [''],
            division: ['', Validators.required]
        }, {
        });

        this.facturaForm = this.formBuilder.group({
            opcion: ['', Validators.required]
        }, {
        });

        this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 100,
            processing: true,
            scrollY: "280",
            scrollX: true,
            select: true,
            language: {
                search: "Buscar:",
                lengthMenu: "Mostrar _MENU_ elementos",
                info: "Mostrando desde _START_ al _END_ de _TOTAL_ elementos",
                infoEmpty: "Mostrando ning&uacute;n elemento.",
                infoFiltered: "(filtrado _MAX_ elementos total)",
                paginate: {
                    first: "Primero",
                    previous: "Anterior",
                    next: "Siguiente",
                    last: "&Uacute;ltimo",

                }
            }
        };

    }

    get g() { return this.facturaForm.controls; }
    get f() { return this.divisionForm.controls; }

    RowSelected(u: any) {
        //this.selectedUser = u;   // declare variable in component.
        console.log(u);
        this.seleccionados.push(u);
        console.log(this.seleccionados);

        //if (this.seleccionados.length >= 2) {

        //} else {
        //    this.seleccionados.length = 0;
        //}
    }

    respuestaPend(respuesta: DataPendiente) {
        const dialogRef = this.dialog.open(ModalAplicacionesPendientesComponent, {
            width: '530px',
            data: {
                opcion: respuesta.opcion
            }         
        });

        dialogRef.afterClosed().subscribe(result => {

            console.log(result);
            if (result == 'yes') {
                const dialogRefCon = this.dialog.open(ConfirmacionPendientesComponent, {
                    width: '530px',
                    data: {
                        opcion: respuesta.opcion
                    }
                });
            } else {
                if (result == 'cancelar') {
                    const dialogRefCan = this.dialog.open(CancelacionPendientesComponent, {
                        width: '530px',
                        data: {
                            opcion: respuesta.opcion
                        }
                    });
                }              
            }
        });
    }

    callValue($event) {
        let text = $event.target.options[$event.target.options.selectedIndex].text;
        text = text.substring(16, 24);
        this.selectedDay = text;

        console.log(this.selectedDay);
    }

    //checkuncheckall() {
    //    if (this.isChecked == true) {
    //        this.isChecked = false;
    //    }
    //    else {
    //        this.isChecked = true;
    //    }

    //}

    cambiosAplicar() {
        
        //this.submitted = true;

        //if (this.divisionForm.invalid) {
        //    return;
        //}
        const valueInput = this.fondovalor.nativeElement.value;
        const valueDivision = this.division.nativeElement.value;
        const valueRfc = this.rfc.nativeElement.value;
        console.log(valueInput);
        console.log(valueRfc);
        
        if (this.seleccionados.length < 2) {
            //alert("debes seleccionador al menos 2 facturas");
            this.showNotification('top', 'right', 'Debes seleccionador al menos 2 facturas', 'warning');

        } else {
            if (this.f.division.value == "") {
                this.showNotification('top', 'right', 'Debes seleccionador la division', 'warning');
            } else {
                const dialogRef = this.dialog.open(ConfirmacionDivisionComponent, {
                    width: '530px',
                    data: {
                        division: this.f.division.value,
                        cliente: valueInput,
                        rfc: valueRfc,
                        seleccionados: this.seleccionados
                        //opcion: respuesta.opcion
                    }
                });
            }
        }
        
        //if (this.seleccionados.length < 2) {
        //    this.showNotification('top', 'right', 'Debes seleccionador al menos 2 facturas', 'warning');
        //} else {
        //    if (this.f.division.value == "") {
        //        alert("viene vacio");
        //    } else {
        //        $("#myModal").modal('show');
        //    }        
        //}
        
    }

    opcionSi() {
        alert("si llega aqui");
    }


    onSubmit() {
        this.submitted = true;

        //this._facturasrfcService.paramFactura(this.facturaForm.value).subscribe(
        //    (data: FacturasRFC[]) => this.facturaList = data);


        this._facturasrfcService.paramFactura(this.facturaForm.value).subscribe((data: FacturasRFC[]) => {
            if (data != null && data.length > 0) {
                this.facturaList = data;
            } else {
                this.facturaList = data;
                this.showNotification('top', 'right', 'No se mostraron facturas del cliente seleccionado', 'warning');
            }
            // This log is never executed even when the update is successful
        }, error => {
            console.log(error);
        });

        this._facturasrfcService.aplicacionesPend(this.facturaForm.value)
            .subscribe((data: DataPendiente) => {
                if (data.opcion != "") {
                    this.respuestaPend(data);
                } else {

                }
                console.log(data);
            }, error => console.error(error));
    }

}
