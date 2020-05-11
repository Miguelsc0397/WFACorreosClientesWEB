import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
//import { Checklistazul } from '../../models/checklistazul';
//import { DataCheck } from '../../models/datacheck';

@Injectable({
  providedIn: 'root'
})
export class ChecklistazulService {

  myAppUrl = '';

  constructor(private _http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.myAppUrl = baseUrl + 'api/Checklistazul/';
  }

  //paramChecklist(datacheck: DataCheck) {
  //  return this._http.post(this.myAppUrl + 'Index', datacheck).pipe(map(
  //    response => {
  //      return response;
  //    }));
  //}

  //getChecklist() {
  //  return this._http.get(this.myAppUrl + 'Index').pipe(map(
  //    response => {
  //      return response;
  //    }));
  //}


  
}
