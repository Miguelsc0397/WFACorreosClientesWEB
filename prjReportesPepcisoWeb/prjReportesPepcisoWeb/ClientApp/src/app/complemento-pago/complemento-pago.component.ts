import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientesRFC } from '../../models/clientesrfc';
import { ClientesRFCService } from '../services/clientesrfc.service';
import { FacturasRFC } from 'models/facturasrfc';
import { FacturasRFCService } from '../services/facturasrfc.service';
import { NotifierService } from 'angular-notifier';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
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

    dtTrigger: Subject<any> = new Subject();

    constructor(private formBuilder: FormBuilder, private _clientesrfcService: ClientesRFCService,
        private _facturasrfcService: FacturasRFCService, notifier: NotifierService) {
        this.notifier = notifier;
    }

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

        this.facturaForm = this.formBuilder.group({
            opcion: ['', Validators.required]
        }, {
        });

        this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 100,
            processing: true,
            scrollY: "400",
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
            //rowCallback: (row: Node, data: any[] | Object, index: number) => {
            //    const self = this;
            //    $('td', row).unbind('selected');
            //    $('td', row).bind('selected', () => {
            //        //self.someClickHandler(data);
            //    });
            //    return row;
            //}
        };

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
    }

}
