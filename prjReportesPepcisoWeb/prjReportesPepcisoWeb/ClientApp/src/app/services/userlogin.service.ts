import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UserLogin } from 'models/userlogin';

@Injectable({
  providedIn: 'root'
})
export class UserLoginService {

  myAppUrl = '';

  constructor(private _http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.myAppUrl = baseUrl + 'api/UserLogin/';
  }

    paramLogin(userlogin: UserLogin) {
        return this._http.post(this.myAppUrl + 'Login', userlogin).pipe(map(
            response => {
                return response;
            }));
    }
  
}

