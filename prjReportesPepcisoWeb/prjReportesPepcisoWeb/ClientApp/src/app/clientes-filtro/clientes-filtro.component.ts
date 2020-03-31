import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientesFiltro } from '../../models/clientesfiltro';
import { ClientesFiltroService } from '../services/clientesfiltro.service';

@Component({
  selector: 'app-clientes-filtro',
  templateUrl: './clientes-filtro.component.html',
  styleUrls: ['./clientes-filtro.component.scss']
})
export class ClientesFiltroComponent implements OnInit {

    filtroForm: FormGroup;
    submitted = false;
    public filtroList: ClientesFiltro[];

    constructor(private formBuilder: FormBuilder, private _clientesService: ClientesFiltroService) {
        this._clientesService.paramFiltroNull().subscribe(
            (data: ClientesFiltro[]) => this.filtroList = data);
         }

    title = 'angulardatatables';
    dtOptions: DataTables.Settings = {};

    //getClientes() {
    //    this._clientesService.getClientes().subscribe(
    //        (data: ClientesFiltro[]) => this.filtroList = data
    //    );
    //}

    ngOnInit() {

        //this._clientesService.paramFiltro(null).subscribe(
        //    (data: ClientesFiltro[]) => this.filtroList = data);

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


    onSubmit() {
        this.submitted = true;

        //this._clientesService.paramFiltro(this.filtroForm.value).subscribe(
        //    (data: ClientesFiltro[]) => this.filtroList = data);

        this._clientesService.paramFiltroNull().subscribe(
            (data: ClientesFiltro[]) => this.filtroList = data);
    }

}
