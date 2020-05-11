import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, ElementRef, ViewChildren, QueryList } from '@angular/core';
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

    @ViewChildren(DataTableDirective)
    dtElement: QueryList<DataTableDirective>;
    dtOptions: DataTables.Settings = {};
    dtTrigger: Subject<any> = new Subject();
    private notifier: NotifierService;
    submitted = false;
    public rfcList: ClientesRFC[];
    public facturaList: FacturasRFC[];
    public facturaForm: FormGroup;
    public listaU: Array<FacturasRFC> = [];
    public seleccionados: Array<FacturasRFC> = [];
    public divisionForm: FormGroup;
    public factura: string;
    public facturasrfc: FacturasRFC;
    selectedCliente: string = '';
    @ViewChild('fondovalor') fondovalor: ElementRef;
    @ViewChild('division') division: ElementRef;
    @ViewChild('rfc') rfc: ElementRef;
    @ViewChild('content') content: any;
    isDtInitialized: boolean = false;

    selectedUser: any;

    constructor(private formBuilder: FormBuilder, private _clientesrfcService: ClientesRFCService,
        private _facturasrfcService: FacturasRFCService, notifier: NotifierService, public dialog: MatDialog) {
        this.notifier = notifier;
    }

    ngAfterViewInit(): void {
        this.dtTrigger.next();
    }

    ngOnDestroy(): void {
        // Do not forget to unsubscribe the event
        this.dtTrigger.unsubscribe();
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

        this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 100,
            processing: true,
            scrollY: "280",
            scrollX: true,
            select: true,
            destroy: true,
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

    }

    get g() { return this.facturaForm.controls; }
    get f() { return this.divisionForm.controls; }


    respuestaPend(respuesta: DataPendiente) {

        const dialogRef = this.dialog.open(ModalAplicacionesPendientesComponent, {
            width: '530px',
            data: {
                opcion: respuesta.opcion
            }
        });

        dialogRef.afterClosed().subscribe(result => {

            if (result == 'no') {
                this.showNotification('top', 'right', 'No es posible Consolidar mas Facturas para el Cliente actual', 'warning');
                $('#submitBtn').prop('disabled', true);
            }

            console.log(result);
            if (result == 'yes') {
                const dialogRefCon = this.dialog.open(ConfirmacionPendientesComponent, {
                    width: '530px',
                    data: {
                        opcion: respuesta.opcion
                    }
                });

                dialogRefCon.afterClosed().subscribe(result => {
                    if (result == 'no') {
                        this.showNotification('top', 'right', 'No es posible Consolidar mas Facturas para el Cliente actual', 'warning');
                        $('#submitBtn').prop('disabled', true);
                    } else {
                        
                        $('#submitBtn').prop('disabled', false);
                    }
                });

            } else {
                if (result == 'cancelar') {
                    const dialogRefCan = this.dialog.open(CancelacionPendientesComponent, {
                        width: '400px',
                        data: {
                            opcion: respuesta.opcion
                        }
                    });
                    dialogRefCan.afterClosed().subscribe(result => {
                        if (result == 'no') {
                            this.showNotification('top', 'right', 'No es posible Consolidar mas Facturas para el Cliente actual', 'warning');
                            $('#submitBtn').prop('disabled', true);
                        } else {
                            this.showFacturas();
                            $('#submitBtn').prop('disabled', false);
                        }                  
                    });

                }
            }
        });
    }

    callValue($event) {
        let text = $event.target.options[$event.target.options.selectedIndex].text;
        text = text.substring(16, 24);
        this.selectedCliente = text;

        console.log(this.selectedCliente);
    }


    cambiosAplicar() {

        const valueInput = this.fondovalor.nativeElement.value;
        const valueDivision = this.division.nativeElement.value;
        const valueRfc = this.rfc.nativeElement.value;
        console.log(valueInput);
        console.log(valueRfc);

        var table = $('#example').DataTable();
        var rows = table.rows({ selected: true }).data().toArray();

        if (rows.length < 2) {
            this.showNotification('top', 'right', 'Debes seleccionar al menos 2 facturas', 'warning');

        } else {
            if (this.f.division.value == "") {
                this.showNotification('top', 'right', 'Debes seleccionar la division', 'warning');
            } else {

                rows.forEach(function (entry) {
                    console.log(entry);
                    this.facturasrfc = new FacturasRFC;
                    this.facturasrfc.cliente = entry[0];
                    this.facturasrfc.nombre = entry[1];
                    this.facturasrfc.factura = entry[2];
                    this.facturasrfc.division = entry[3];
                    this.facturasrfc.uuid = entry[4];
                    this.facturasrfc.total = Number(entry[5]);
                    this.facturasrfc.moneda = entry[6];
                    this.facturasrfc.fecha_factura = entry[7];
                    this.facturasrfc.hora_factura = entry[8];
                    this.facturasrfc.folio = Number(entry[9]);

                    this.seleccionados.push(this.facturasrfc);
                    console.log(this.seleccionados);
                }, this);

                const dialogRef = this.dialog.open(ConfirmacionDivisionComponent, {
                    width: '530px',
                    data: {
                        division: this.f.division.value,
                        cliente: valueInput,
                        rfc: valueRfc,
                        seleccionados: this.seleccionados
                    }
                });

                dialogRef.afterClosed().subscribe(result => {

                    console.log(result);
                    if (result == 'no') {

                    } else {                       
                        this.showFacturas();
                        $('#submitBtn').prop('disabled', true);
                    }                  
                });
            }
        }

    }

    showFacturas() {

        this._facturasrfcService.paramFactura(this.facturaForm.value).subscribe((data: FacturasRFC[]) => {

            let retrievedCards = [];
            for (let rfc of data) {
                retrievedCards.push(rfc);
            }

            if (!this.facturaList) {
                this.facturaList = retrievedCards;
                this.facturaList['currentSet'] = name;
                setTimeout(() => {
                    this.dtTrigger.next();
                });
            } else {
                this.dtElement.forEach(table => {
                    if (table.dtTrigger) {
                        table.dtInstance.then((dt: DataTables.Api) => {
                            dt.destroy();
                            this.facturaList = retrievedCards;
                            this.facturaList['currentSet'] = name;
                            setTimeout(() => {
                                this.dtTrigger.next();
                            });
                        });
                    }
                });
            }
            if (retrievedCards.length <= 0) {
                this.showNotification('top', 'right', 'No se mostraron facturas del cliente seleccionado', 'warning');

            }
        }, error => {
            console.log(error);
        });
    }

    apliPendientes() {

        this._facturasrfcService.aplicacionesPend(this.facturaForm.value)
            .subscribe((data: DataPendiente) => {
                if (data.opcion != "") {
                    this.respuestaPend(data);
                } else {
                    $('#submitBtn').prop('disabled', false);
                }
                console.log(data);
            }, error => console.error(error));
    }

    onSubmit() {
        this.submitted = true;

        this.showFacturas();

        this.apliPendientes();
    }

}
