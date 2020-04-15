import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UserLoginService } from '../services/userlogin.service';
import { UserLogin } from 'models/userlogin';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

    myAppUrl = '';

    constructor(private _http: HttpClient, @Inject('BASE_URL') baseUrl: string, private router: Router) {
        this.myAppUrl = baseUrl + 'api/UserLogin/';
    }

    authenticate(userlogin: UserLogin) {
        //if (username === "javainuse" && password === "password") {
        //    sessionStorage.setItem('username', username)
        //    return true;
        //} else {
        //    return false;
        //}

        //return this._http.post(this.myAppUrl + 'Login', userlogin).pipe(map(
        //    response => {
        //        return response;
        //    }));

        return this._http.post(this.myAppUrl + 'Login', userlogin).pipe(map(
            (response: number) => {
                if (response != null && response == 1) {
                    sessionStorage.setItem('usuario', userlogin.usuario)
                }
                return response;
            }));
    }



    // authenticate(usuario: string, password: string) {
    //    sessionStorage.setItem('usuario', usuario)
    //    return true;
    //}

    isUserLoggedIn() {
        let user = sessionStorage.getItem('usuario')
        console.log(!(user === null))
        return !(user === null)
    }

    logOut() {
        sessionStorage.removeItem('usuario')
        window.location.reload();
    }
}
