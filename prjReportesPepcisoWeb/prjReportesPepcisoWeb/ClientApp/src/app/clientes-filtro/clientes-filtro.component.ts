import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ClientesFiltro } from '../../models/clientesfiltro';
import { ClientesFiltroService } from '../services/clientesfiltro.service';
import { ConfirmacionEditComponent } from '../confirmacion-edit/confirmacion-edit.component';
import { ModalEditClientescorreosComponent } from '../modal-edit-clientescorreos/modal-edit-clientescorreos.component';
import { ActivatedRoute, Router } from '@angular/router';
declare var $: any

@Component({
  selector: 'app-clientes-filtro',
  templateUrl: './clientes-filtro.component.html',
  styleUrls: ['./clientes-filtro.component.scss']
})
export class ClientesFiltroComponent implements OnInit {

    filtroForm: FormGroup;
    
    submitted = false;
    public filtroList: ClientesFiltro[];
    public correosList: ClientesFiltro[];
    public parametros: ClientesFiltro = new ClientesFiltro;

    constructor(private formBuilder: FormBuilder, private _clientesService: ClientesFiltroService, public dialog: MatDialog,
        private _router: Router) {
        
         }

    title = 'angulardatatables';
    dtOptions: any = {};

    openDialog(): void {
        const dialogref = this.dialog.open(ConfirmacionEditComponent, {
            width: '270px',
            //data: "Se limpiará el resultado de la consulta, ¿ desea continuar ?",

        });

        dialogref.afterClosed().subscribe(result => {
            //this.onEnviar();
        });
    }

    someClickHandler(info: any): void {
        this.parametros.clave_cliente = info[0];

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
                this.filtroList = this.filtroList.filter((value, key) => {
                    if (value.clave_cliente == res.data.numerocliente) {
                        value.correos_cliente = res.data.correosnuevos;
                        if (res.data.pagos == true) {
                            value.pagos_anticipados = "SI";
                        } else {
                            value.pagos_anticipados = "";
                        }
                        
                    }
                    return true;
                });
            }
            // received data from confirm-component
        })
    }
    
    ngOnInit() {

        this._clientesService.paramFiltroNull().subscribe(
            (data: ClientesFiltro[]) => this.filtroList = data);

        this.filtroForm = this.formBuilder.group({
            filtro: [''],
            pagosanticipados: [false]
        }, {
        });

        this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 100,
            processing: true,
            scrollY: "400",
            scrollX: true,
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
            },
            rowCallback: (row: Node, data: any[] | Object, index: number) => {
                const self = this;
                $('td', row).unbind('dblclick');
                $('td', row).bind('dblclick', () => {
                    self.someClickHandler(data);
                });
                return row;
            }

        };

    }

    get f() { return this.filtroForm.controls; }


    onSubmit() {
        //this.submitted = true;

        //this._clientesService.paramFiltro(this.filtroForm.value).subscribe(
        //    (data: ClientesFiltro[]) => this.filtroList = data);

      
    }

    
    
}
