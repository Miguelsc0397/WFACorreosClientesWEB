import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ClientesFiltro } from '../../models/clientesfiltro';
import { ClientesFiltroService } from '../services/clientesfiltro.service';
import { ConfirmacionEditComponent } from '../confirmacion-edit/confirmacion-edit.component';
declare var $: any

@Component({
  selector: 'app-clientes-filtro',
  templateUrl: './clientes-filtro.component.html',
  styleUrls: ['./clientes-filtro.component.scss']
})
export class ClientesFiltroComponent implements OnInit {

    filtroForm: FormGroup;
    editProfileForm: FormGroup;
    submitted = false;
    public filtroList: ClientesFiltro[];
    public correosList: ClientesFiltro[];

    constructor(private formBuilder: FormBuilder, private _clientesService: ClientesFiltroService, public dialog: MatDialog) {
        this._clientesService.paramFiltroNull().subscribe(
            (data: ClientesFiltro[]) => this.filtroList = data);
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
        $('#myModal').appendTo("body").modal('show');
        this.editProfileForm.patchValue({
            numerocliente: info[0],
            nombrecliente: info[1],
            pagos: info[2] != null && info[2] == "SI" ? true : false,
            correosactuales: info[3],
            correosnuevos: info[3]
            
        });
    }
    
    ngOnInit() {

        this.filtroForm = this.formBuilder.group({
            filtro: [''],
            pagosanticipados: [false]
        }, {
        });

        this.editProfileForm = this.formBuilder.group({
            numerocliente: [''],
            nombrecliente: [''],
            correosactuales: [''],
            correosnuevos: [''],
            pagos: [false]
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
        this.submitted = true;

        this._clientesService.paramFiltro(this.filtroForm.value).subscribe(
            (data: ClientesFiltro[]) => this.filtroList = data);

        //this._clientesService.paramFiltroNull().subscribe(
        //    (data: ClientesFiltro[]) => this.filtroList = data);
    }

    onEnviar() {

        this._clientesService.updateClientesCorreos(this.editProfileForm.value)
            .subscribe(() => {
                $('#myModal').appendTo("body").modal('hide');
                this._clientesService.paramFiltroNull().subscribe(
                    (data: ClientesFiltro[]) => this.filtroList = data);
            }, error => console.error(error));
        
    }

    
}
