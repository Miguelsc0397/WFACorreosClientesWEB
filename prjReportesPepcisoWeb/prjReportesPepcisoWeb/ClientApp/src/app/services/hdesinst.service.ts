import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Heineken_Desinstalaciones } from '../../models/heineken_desinst';
import { Data } from '../../models/data';

@Injectable({
  providedIn: 'root'
})
export class HDesInstService {

  myAppUrl = '';

  constructor(private _http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.myAppUrl = baseUrl + 'api/HDesinstalaciones/';
  }

  //getDesinstal() {
  //  return this._http.get(this.myAppUrl + 'Index').pipe(map(
  //    response => {
  //      return response;
  //    }));
  //}

  paramDesinst(data: Data) {
    return this._http.post(this.myAppUrl + 'Index', data).pipe(map(
      response => {
        return response;
      }));
  }


  
}
