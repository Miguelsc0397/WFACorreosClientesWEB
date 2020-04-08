import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { DataFactura } from '../../models/datafactura';
import { ClientesRFC } from '../../models/clientesrfc';

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

}
