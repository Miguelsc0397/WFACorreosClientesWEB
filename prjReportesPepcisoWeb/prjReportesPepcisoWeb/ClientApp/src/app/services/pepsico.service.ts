import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Pepsico } from '../../models/Pepsico';
import { Data } from '../../models/data';

@Injectable({
  providedIn: 'root'
})
export class PepsicoService {

  myAppUrl = '';

  constructor(private _http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.myAppUrl = baseUrl + 'api/Pepsico/';
  }

  //getPepsico() {
  //  return this._http.get(this.myAppUrl + 'Index').pipe(map(
  //    response => {
  //      return response;
  //    }));
  //}

  paramPepsico(data: Data) {
    return this._http.post(this.myAppUrl + 'Index', data).pipe(map(
      response => {
        return response;
      }));
  }

  //savePepsico(datapepsico: DataPepsico) {
  //  return this._http.post(this.myAppUrl + 'Index', datapepsico)
  //    .pipe(map(
  //      response => {
  //        return response;
  //      }));
  //}


  
}
