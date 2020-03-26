import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { HeinekenInstalaciones } from '../../models/heineken_inst';
import { Data } from '../../models/data';

@Injectable({
  providedIn: 'root'
})
export class HeinekenInstService {

  myAppUrl = '';

  constructor(private _http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.myAppUrl = baseUrl + 'api/HInstalaciones/';
  }

  paramInst(data: Data) {
    return this._http.post(this.myAppUrl + 'Index', data).pipe(map(
      response => {
        return response;
      }));
  }

  //getInstal() {
  //  return this._http.get(this.myAppUrl + 'Index').pipe(map(
  //    response => {
  //      return response;
  //    }));
  //}


  
}
