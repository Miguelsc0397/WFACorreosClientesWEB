import { Component, OnInit } from '@angular/core';
import { HeinekenInstService } from '../services/heineken-inst.service';
import { HeinekenInstalaciones } from '../../models/heineken_inst';

@Component({
  selector: 'app-fetch-hinstalaciones',
  templateUrl: './fetch-heineken-inst.component.html',
  styleUrls: ['./fetch-heineken-inst.component.css']
})
export class FetchHeinekenInstalacionesComponent implements OnInit {

  public instList: HeinekenInstalaciones[];

  constructor(private _heinekenInstalacionesService: HeinekenInstService) {
    //this.getInstal();
  }

  //getInstal() {
  //  this._heinekenInstalacionesService.getInstal().subscribe(
  //    (data: HeinekenInstalaciones[]) => this.instList = data
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
