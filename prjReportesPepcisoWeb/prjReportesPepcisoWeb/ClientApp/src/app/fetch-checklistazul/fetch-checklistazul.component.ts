import { Component, OnInit } from '@angular/core';
import { ChecklistazulService } from '../services/checklistazul.service';
//import { Checklistazul } from '../..//models/checklistazul';

@Component({
  selector: 'app-fetch-checklistazul',
  templateUrl: './fetch-checklistazul.component.html',
  styleUrls: ['./fetch-checklistazul.component.css']
})
export class FetchChecklistazulComponent implements OnInit {

  //public checkList: Checklistazul[];

  constructor(private _checklistService: ChecklistazulService) {
    //this.getChecklist();
  }

  //getChecklist() {
  //  this._checklistService.getChecklist().subscribe(
  //    (data: Checklistazul[]) => this.checkList = data
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
