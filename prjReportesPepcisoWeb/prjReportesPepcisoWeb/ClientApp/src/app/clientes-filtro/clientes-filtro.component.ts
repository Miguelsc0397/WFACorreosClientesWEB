import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ClientesFiltro } from '../../models/clientesfiltro';
import { ClientesFiltroService } from '../services/clientesfiltro.service';
import { ConfirmacionEditComponent } from '../confirmacion-edit/confirmacion-edit.component';
import { ModalEditClientescorreosComponent } from '../modal-edit-clientescorreos/modal-edit-clientescorreos.component';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { NotifierService } from 'angular-notifier';

declare var $: any

@Component({
  selector: 'app-clientes-filtro',
  templateUrl: './clientes-filtro.component.html',
  styleUrls: ['./clientes-filtro.component.scss']
})
export class ClientesFiltroComponent implements AfterViewInit, OnDestroy, OnInit {

    
    filtroForm: FormGroup;
    submitted = false;
    public filtroList: ClientesFiltro[];
    public correosList: ClientesFiltro[];
    public parametros: ClientesFiltro = new ClientesFiltro;
    @ViewChildren(DataTableDirective)
    dtElement: QueryList<DataTableDirective>;
    dtOptions: DataTables.Settings = {};
    dtTrigger: Subject<any> = new Subject();
    private notifier: NotifierService;

    constructor(private formBuilder: FormBuilder, private _clientesService: ClientesFiltroService, public dialog: MatDialog,
        private _router: Router, notifier: NotifierService) {
        this.notifier = notifier;
         }

    title = 'angulardatatables';

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

    ngAfterViewInit(): void {
        this.dtTrigger.next();
    }

    ngOnDestroy(): void {
        // Do not forget to unsubscribe the event
        this.dtTrigger.unsubscribe();
    }

    someClickHandler(info: any): void {
        this.parametros.clave_cliente = info.clave_cliente;

        this._clientesService.consultgarRFC(this.parametros)
            .subscribe((response: ClientesFiltro) => {
                console.log(response);
                //this.parametros = response;
                this.show(response);
            }, error => console.error(error));

    }

    show(cliente: ClientesFiltro) {
        const dialogRef = this.dialog.open(ModalEditClientescorreosComponent, {
            width: '800px',
            data: {
                numerocliente: cliente.clave_cliente,
                nombrecliente: cliente.nombre_cliente,
                pagos: cliente.pagos_anticipados != null && cliente.pagos_anticipados == "SI" ? true : false,
                correosactuales: cliente.correos_cliente,
                correosnuevos: cliente.correos_cliente
            }
        });


        dialogRef.afterClosed().subscribe(res => {
            console.log(res.data)
     
            if (res.data != null) {

                this.refreshDatatable();
                this.showNotification('top', 'right', 'Datos actualizados', 'success');
                //this.filtroList = this.filtroList.filter((value, key) => {
                //    if (value.clave_cliente == res.data.numerocliente) {
                //        value.correos_cliente = res.data.correosnuevos;
                //        if (res.data.pagos == true) {
                //            value.pagos_anticipados = "SI";
                //        } else {
                //            value.pagos_anticipados = "";
                //        }
                        
                //    }
                //    return true;
                //});
            }
        })
    }
    
    ngOnInit() {

        this.refreshDatatable();

        this.filtroForm = this.formBuilder.group({
            filtro: [''],
            pagosanticipados: [false]
        }, {
        });

        this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 100,
            processing: true,
            scrollY: "380",
            scrollX: true,
            destroy: true,
            responsive: true,
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

    get f() { return this.filtroForm.controls; }

    refreshDatatable() {

        this._clientesService.paramFiltroNull().subscribe((data: ClientesFiltro[]) => {

            let retrievedCards = [];
            for (let rfc of data) {
                retrievedCards.push(rfc);
            }

            if (!this.filtroList) {
                this.filtroList = retrievedCards;
                this.filtroList['currentSet'] = name;
                setTimeout(() => {
                    this.dtTrigger.next();
                });
            } else {
                this.dtElement.forEach(table => {
                    if (table.dtTrigger) {
                        table.dtInstance.then((dt: DataTables.Api) => {
                            dt.destroy();
                            this.filtroList = retrievedCards;
                            this.filtroList['currentSet'] = name;
                            setTimeout(() => {
                                this.dtTrigger.next();
                            });
                        });
                    }
                });
            }
        }, error => {
            console.log(error);
        });

    }

    onSubmit() {
        this.submitted = true;

        this._clientesService.paramFiltro(this.filtroForm.value).subscribe((data: ClientesFiltro[]) => {

            let retrievedCards = [];
            for (let rfc of data) {
                retrievedCards.push(rfc);
            }

            if (!this.filtroList) {
                this.filtroList = retrievedCards;
                this.filtroList['currentSet'] = name;
                setTimeout(() => {
                    this.dtTrigger.next();
                });
            } else {
                this.dtElement.forEach(table => {
                    if (table.dtTrigger) {
                        table.dtInstance.then((dt: DataTables.Api) => {
                            dt.destroy();
                            this.filtroList = retrievedCards;
                            this.filtroList['currentSet'] = name;
                            setTimeout(() => {
                                this.dtTrigger.next();
                            });
                        });
                    }
                });
            }

        }, error => {
            console.log(error);
        }); 
    }

    
    
}
