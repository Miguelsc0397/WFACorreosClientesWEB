import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
//import { Employee } from '../../models/employee';
import { UserLogin } from 'models/userlogin';

@Injectable({
  providedIn: 'root'
})
export class UserLoginService {

  myAppUrl = '';

  constructor(private _http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.myAppUrl = baseUrl + 'api/UserLogin/';
  }

  
}
