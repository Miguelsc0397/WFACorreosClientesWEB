import { Component, OnInit } from '@angular/core';
import { PepsicoService } from '../services/pepsico.service';
//import { Pepsico } from '../../models/Pepsico';

@Component({
  selector: 'app-fetch-pepsico',
  templateUrl: './fetch-pepsico.component.html',
  styleUrls: ['./fetch-pepsico.component.css']
})
export class FetchPepsicoComponent implements OnInit {

  //public pepsicoList: Pepsico[];

  //load
  //constructor(private _pepsicoService: PepsicoService) {
  //  this.getPepsico();
  //}

  //getPepsico() {
  //  this._pepsicoService.getPepsico().subscribe(
  //    (data: Pepsico[]) => this.pepsicoList = data
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
