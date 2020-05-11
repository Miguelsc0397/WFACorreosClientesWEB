import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChecklistazulService } from '../services/checklistazul.service';
//import { Checklistazul } from '../../models/checklistazul';
import { ExporterService } from '../services/exporter.service';
import { MatDialog, MatDialogRef } from '@angular/material';
//import { ConfirmacionDialogoComponent } from '../confirmacion-dialogo/confirmacion-dialogo.component';

@Component({
  selector: 'app-fetch-iniciocheck',
  templateUrl: './fetch-iniciocheck.component.html',
  styleUrls: ['./fetch-iniciocheck.component.css']
})
export class FetchInicioCheckComponent implements OnInit {

  checkForm: FormGroup;
  submitted = false;
  //public checkList: Checklistazul[];
  titledialog = 'angular-confirmation-dialog';


  constructor(private formBuilder: FormBuilder, private _checklistService: ChecklistazulService,
      private excelService: ExporterService, public dialog: MatDialog ) { }

  title = 'angulardatatables';
    dtOptions: DataTables.Settings = {};

    //openDialog(): void {
    //    const dialogref = this.dialog.open(ConfirmacionDialogoComponent, {
    //        width: '250px',
    //        data: "Se limpiará el resultado de la consulta, ¿ desea continuar ?",

    //    });

    //    dialogref.afterClosed().subscribe(result => {
    //        this.onReset();
    //    });
    //}

  ngOnInit() {

    this.checkForm = this.formBuilder.group({
      parameter1: [''],
      parameter2: [''],
      showcompletos: [false]
    }, {
    });

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 200,
      processing: true,
      scrollY: "400",
      scrollX: true
    };

  }

  //onExportar() {
  //  this.excelService.exportToExcel(this.checkList, 'Checklist_azul');
  //}

  get f() { return this.checkForm.controls; }

  onSubmit() {
    this.submitted = true;
    //this.checkList = null;
    
    //this._checklistService.paramChecklist(this.checkForm.value).subscribe(
    //  (data: Checklistazul[]) => this.checkList = data
    //);

  }

  onReset() {
    this.submitted = false;
    //this.checkList = null;
    this.checkForm.reset();
    this.ngOnInit();
  }

}
