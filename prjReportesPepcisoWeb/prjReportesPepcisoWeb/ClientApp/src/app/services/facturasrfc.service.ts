import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { DataFactura } from '../../models/datafactura';
import { ClientesRFC } from '../../models/clientesrfc';
import { DataPendiente } from '../../models/datapendiente';

@Injectable({
    providedIn: 'root'
})
export class FacturasRFCService {

    myAppUrl = '';

    constructor(private _http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
        this.myAppUrl = baseUrl + 'api/FacturasRFC/';
    }

    paramFactura(datafactura: DataFactura) {
        return this._http.post(this.myAppUrl + 'Index', datafactura).pipe(map(
            response => {
                return response;
            }));
    }

    aplicacionesPend(datafactura: DataFactura) {
        return this._http.post(this.myAppUrl + 'Consultar', datafactura).pipe(map(
            response => {
                return response;
            }));
    }

    confirmPendiente(datapendiente: DataPendiente) {

        let user = sessionStorage.getItem('usuario')
        datapendiente.usuario = user;

        return this._http.post(this.myAppUrl + 'Confirmar', datapendiente).pipe(map(
            response => {
                return response;
            }));
    }

    cancelPendiente(datapendiente: DataPendiente) {

        let user = sessionStorage.getItem('usuario')
        datapendiente.usuario = user;

        return this._http.post(this.myAppUrl + 'Cancelar', datapendiente).pipe(map(
            response => {
                return response;
            }));
    }


    //aplicacionesPend2(datafactura: DataFactura) {
    //    return this._http.post(this.myAppUrl + 'Consultar', { responseType: 'text' })        // Notice the additional parameter here
    //        .pipe(map((response: Response)=<any[]>response.json()));
    //}

}
