import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {
    public identity: boolean = true;

    constructor(private authentocationService: AuthenticationService) { }

    ngOnInit() {
        this.authentocationService.logOut();
        this.identity = true;
  }

}
