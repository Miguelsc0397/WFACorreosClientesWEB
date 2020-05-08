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

    //@ViewChildren(DataTableDirective)
    //tables: QueryList<DataTableDirective>;
    //@ViewChild(DataTableDirective)
    //dtElement: DataTableDirective;
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


    //rerender(): void {
    //    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
    //        // Destroy the table first

    //        //var table = $('#favoriteTable').DataTable();

    //        //table.destroy();

    //        dtInstance.destroy();
    //        // Call the dtTrigger to rerender again
    //        this.dtTrigger.next();
    //    });
    //}

    ngOnDestroy(): void {
        // Do not forget to unsubscribe the event
        this.dtTrigger.unsubscribe();
    }

    //rerender(): void {
    //    if ("dtInstance" in this.dtElement) {
    //        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
    //            // Destroy the table first
    //            dtInstance.destroy();
    //            // Call the dtTrigger to rerender again
    //            this.dtTrigger.next();
    //        });
    //    }
    //    else {
    //        this.dtTrigger.next();
    //    }
    //}

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

    //RowSelected(u: any) {
    //    this.selectedUser = u;   // declare variable in component.
    //    console.log(u);
    //    var factura = u.find(x => x.factura).factura;
    //    console.log(factura);
    //    this.seleccionados.push(u);
    //     console.log(this.seleccionados);
    //    var factura = u.factura;
    //    console.log(factura);
    //    this.listaU.push(u);

    //    $('table').each(function () {
    //        var currentSelect = $(this);
    //        // ... do your thing ;-)
    //    });

    //    console.log(this.seleccionados.includes('010M22642'));

    //    if (this.seleccionados.includes(u.factura)) {
    //        alert("existe");
    //    } else {
    //        alert("no existe");
    //        this.seleccionados.push(u);
    //    }
    //    var busqueda = this.listaU.find(e => e.factura === factura);

    //    console.log(busqueda);

    //    console.log(factura);
    //    console.log(this.listaU);

    //    if (this.listaU.indexOf(factura) !== -1) {
    //        alert("el valor existe");
    //    } else {
    //        alert("el valor no existe");
    //    }

    //}

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
                        width: '400px',
                        data: {
                            opcion: respuesta.opcion
                        }
                    });
                    dialogRefCan.afterClosed().subscribe(result => {

                        console.log(result);
                        this.showFacturas();
                    });

                }
            }
           // this.showFacturas();
        });
    }

    callValue($event) {
        let text = $event.target.options[$event.target.options.selectedIndex].text;
        text = text.substring(16, 24);
        this.selectedCliente = text;

        console.log(this.selectedCliente);
    }


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
                     this.showFacturas();
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
            //if (data != null && data.length > 0) {
            //    this.facturaList = data;
            //    console.log(this.facturaList);
            //    setTimeout(() => {
            //        this.dtTrigger.next();
            //    });
            //    // ADD THIS
            //    //this.dtTrigger.next();
            //    //this.rerender();
            //} else {
            //    this.facturaList = data;
            //    this.showNotification('top', 'right', 'No se mostraron facturas del cliente seleccionado', 'warning');
            //}
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

        //this._facturasrfcService.paramFactura(this.facturaForm.value).subscribe((data: FacturasRFC[]) => {
        //    if (data != null && data.length > 0) {
        //        this.facturaList = data;
        //    } else {
        //        this.facturaList = data;
        //        this.showNotification('top', 'right', 'No se mostraron facturas del cliente seleccionado', 'warning');
        //    }
        //}, error => {
        //    console.log(error);
        //});

        this.showFacturas();

        //this._facturasrfcService.aplicacionesPend(this.facturaForm.value)
        //    .subscribe((data: DataPendiente) => {
        //        if (data.opcion != "") {
        //            this.respuestaPend(data);
        //        } else {

        //        }
        //        console.log(data);
        //    }, error => console.error(error));

        this.apliPendientes();
    }

}
