import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ClientesFiltro } from 'models/clientesfiltro';
import { DataFiltro } from '../../models/datafiltro';
import { DataCorreo } from '../../models/datacorreo';

@Injectable({
    providedIn: 'root'
})
export class ClientesFiltroService {

    myAppUrl = '';

    constructor(private _http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
        this.myAppUrl = baseUrl + 'api/ClientesFiltro/';
    }

    paramFiltro(datafiltro: DataFiltro) {
        return this._http.post(this.myAppUrl + 'Index', datafiltro).pipe(map(
            response => {
                return response;
            }));
    }

    paramFiltroNull() {
        return this._http.get(this.myAppUrl + 'Inicio').pipe(map(
            response => {
                return response;
            }));
    }

    updateClientesCorreos(datacorreo: DataCorreo) {
        if (datacorreo.pagos == null) {
            datacorreo.pagos = false;
        }
        return this._http.post(this.myAppUrl + 'Edit', datacorreo)
            .pipe(map(
                response => {
                    return response;
                }));
    }

    //getClientes() {
    //  return this._http.get(this.myAppUrl + 'Index').pipe(map(
    //    response => {
    //        return response;
    //    }));
    //}

}
