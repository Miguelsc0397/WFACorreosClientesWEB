import { Component, OnInit } from '@angular/core';
import { KOFService } from '../services/kof.service';
import { KOF } from '../../models/kof';

@Component({
  selector: 'app-fetch-kof',
  templateUrl: './fetch-kof.component.html',
  styleUrls: ['./fetch-kof.component.css']
})
export class FetchKOFComponent implements OnInit {

  public kofList: KOF[];

  constructor(private _kofService: KOFService) {
    //this.getKOF();
  }

  //getKOF() {
  //  this._kofService.getKOF().subscribe(
  //    (data: KOF[]) => this.kofList = data
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
