import { Component, OnInit } from '@angular/core';
import { HDesInstService } from '../services/hdesinst.service';
//import { Heineken_Desinstalaciones } from '../../models/heineken_desinst';

@Component({
  selector: 'app-fetch-desinstalaciones',
  templateUrl: './fetch-hdesinst.component.html',
  styleUrls: ['./fetch-hdesinst.component.css']
})
export class FetchHDesinstComponent implements OnInit {

  //public desinstList: Heineken_Desinstalaciones[];

  constructor(private _desinstalacionesService: HDesInstService) {
    //this.getDesinstal();
  }

  //getDesinstal() {
  //  this._desinstalacionesService.getDesinstal().subscribe(
  //    (data: Heineken_Desinstalaciones[]) => this.desinstList = data
  //  );
  //}

  title = 'angulardatatables';
  dtOptions: DataTables.Settings = {};
  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 200,
      processing: true,
      scrollY: "400",
      scrollX: true
    };
  }

}
