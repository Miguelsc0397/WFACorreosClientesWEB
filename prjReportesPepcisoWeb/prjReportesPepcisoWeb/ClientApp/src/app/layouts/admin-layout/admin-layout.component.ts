import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy, PopStateEvent } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import 'rxjs/add/operator/filter';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import PerfectScrollbar from 'perfect-scrollbar';
import { UserLogin } from 'models/userlogin';
import { UserLoginService } from '../../services/userlogin.service';
import { Observable } from 'rxjs';
import { NotifierService } from 'angular-notifier';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {
  private _router: Subscription;
  private lastPoppedUrl: string;
    private yScrollStack: number[] = [];
    public identity: boolean = true;
    private notifier: NotifierService;
    public loginForm: FormGroup;
    submitted = false;
    invalidLogin = false;

    constructor(public location: Location, private router: Router, private formBuilder: FormBuilder,
        private loginservice: AuthenticationService) {
        //this.loginservice.isUserLoggedIn;
    }

    ngOnInit() {
        let result = this.loginservice.isUserLoggedIn();

        if (result) {
            this.identity = false;
        } else {
            this.identity = true;
        }

        this.loginForm = this.formBuilder.group({
            usuario: ['', Validators.required],
            password: ['', Validators.required]
        }, {
        });

    console.log(this.router)
      const isWindows = navigator.platform.indexOf('Win') > -1 ? true : false;

      if (isWindows) {
          // if we are on windows OS we activate the perfectScrollbar function

          document.getElementsByTagName('body')[0].classList.add('perfect-scrollbar-on');
      } else {
          document.getElementsByTagName('body')[0].classList.remove('perfect-scrollbar-off');
      }
      const elemMainPanel = <HTMLElement>document.querySelector('.main-panel');
      const elemSidebar = <HTMLElement>document.querySelector('.sidebar .sidebar-wrapper');

      this.location.subscribe((ev:PopStateEvent) => {
          this.lastPoppedUrl = ev.url;
      });
       this.router.events.subscribe((event:any) => {
          if (event instanceof NavigationStart) {
             if (event.url != this.lastPoppedUrl)
                 this.yScrollStack.push(window.scrollY);
         } else if (event instanceof NavigationEnd) {
             if (event.url == this.lastPoppedUrl) {
                 this.lastPoppedUrl = undefined;
                 window.scrollTo(0, this.yScrollStack.pop());
             } else
                 window.scrollTo(0, 0);
         }
      });
      this._router = this.router.events.filter(event => event instanceof NavigationEnd).subscribe((event: NavigationEnd) => {
           elemMainPanel.scrollTop = 0;
           elemSidebar.scrollTop = 0;
      });
      if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
          let ps = new PerfectScrollbar(elemMainPanel);
          ps = new PerfectScrollbar(elemSidebar);
      }
    }

    get f() { return this.loginForm.controls; }

  ngAfterViewInit() {
      this.runOnRouteChange();
  }
  isMap(path){
      var titlee = this.location.prepareExternalUrl(this.location.path());
      titlee = titlee.slice( 1 );
      if(path == titlee){
          return false;
      }
      else {
          return true;
      }
  }
  runOnRouteChange(): void {
    if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
      const elemMainPanel = <HTMLElement>document.querySelector('.main-panel');
      const ps = new PerfectScrollbar(elemMainPanel);
      ps.update();
    }
  }
  isMac(): boolean {
      let bool = false;
      if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
          bool = true;
      }
      return bool;
  }

    isLogin() {
        this.submitted = true;

        if (this.loginForm.invalid) {
            return;
        }


        this.loginservice.authenticate(this.loginForm.value)
            .subscribe((data: number) => {
                if (data == 1) {
                    //this.loginservice.authenticate(this.f.usuario.value, this.f.password.value)
                    //alert("llego aqui");
                    this.identity = false;
                    this.invalidLogin = false;
                } else {
                    //alert("llego aqui por ser 0");
                    this.invalidLogin = true;
                }
            }, error => console.error(error));

        
    }

}
