import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { KOF } from '../../models/kof';
import { Data } from '../../models/data';

@Injectable({
  providedIn: 'root'
})
export class KOFService {

  myAppUrl = '';

  constructor(private _http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.myAppUrl = baseUrl + 'api/KOF/';
  }

  paramKOF(data: Data) {
    return this._http.post(this.myAppUrl + 'Index', data).pipe(map(
      response => {
        return response;
      }));
  }


  
}
