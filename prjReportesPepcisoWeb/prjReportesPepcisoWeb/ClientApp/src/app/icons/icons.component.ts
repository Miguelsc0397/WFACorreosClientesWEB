import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PepsicoService } from '../services/pepsico.service';
import { ActivatedRoute, Router } from '@angular/router';
//import { Pepsico } from '../../models/Pepsico';
//import { Employee } from '../../models/employee';
import { ExporterService } from '../services/exporter.service';
//import { KOF } from '../../models/kof';
import { KOFService } from '../services/kof.service';
import { HDesInstService } from '../services/hdesinst.service';
//import { Heineken_Desinstalaciones } from '../../models/heineken_desinst';
import { HeinekenInstService } from '../services/heineken-inst.service';
//import { HeinekenInstalaciones } from '../../models/heineken_inst';

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.css']
})
export class IconsComponent implements OnInit {

  dataForm: FormGroup;
  submitted = false;
  //public pepsicoList: Pepsico[];
  //public empList: Employee[];
  //public kofList: KOF[];
  //public desinstList: Heineken_Desinstalaciones[];
  //public instList: HeinekenInstalaciones[];

  constructor(private formBuilder: FormBuilder, private _pepsicoService: PepsicoService,
    private excelService: ExporterService, private _kofService: KOFService,
    private _desinstalacionesService: HDesInstService, private _heinekenInstalacionesService: HeinekenInstService) { }

  title = 'angulardatatables';
  dtOptions: DataTables.Settings = {};

  ngOnInit() {

    this.dataForm = this.formBuilder.group({
      opcion: ['', Validators.required],
      parameter1: [''],
      parameter2: [''],
      radioParam: ['']
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

  exportAsXLSX(): void {

    //if (this.dataForm.value["opcion"] == "Pepsico") {

    //  this.excelService.exportToExcel(this.pepsicoList, 'Pepsico');

    //} else {
    //  if (this.dataForm.value["opcion"] == "KOF") {

    //    this.excelService.exportToExcel(this.kofList, 'KOF');

    //  } else {
    //    if (this.dataForm.value["opcion"] == "Heineken") {
    //      if (this.dataForm.value["radioParam"] == "instalaciones") {
            
    //        this.excelService.exportToExcel(this.instList, 'Heineken_Instalaciones');
    //      }
    //    }

    //    if (this.dataForm.value["radioParam"] == "desinstalaciones") {
          
    //      this.excelService.exportToExcel(this.desinstList, 'Heineken_Desinstalaciones');
    //    }
    //  }
    //}
  }

  get f() { return this.dataForm.controls; }

  onSubmit() {
    this.submitted = true;
    //this.pepsicoList = null;
    //this.kofList = null;
    //this.instList = null;
    //this.desinstList = null;


    //if (this.dataForm.value["opcion"] == "Pepsico") {

    //  this._pepsicoService.paramPepsico(this.dataForm.value).subscribe(
    //    (data: Pepsico[]) => this.pepsicoList = data
    //  );

    //} else {
    //  if (this.dataForm.value["opcion"] == "KOF") {

    //    this._kofService.paramKOF(this.dataForm.value).subscribe(
    //      (data: KOF[]) => this.kofList = data
    //    );

    //  } else {
    //    if (this.dataForm.value["opcion"] == "Heineken") {
    //      if (this.dataForm.value["radioParam"] == "instalaciones") {

    //        this._heinekenInstalacionesService.paramInst(this.dataForm.value).subscribe(
    //        (data: HeinekenInstalaciones[]) => this.instList = data
    //      );

    //      }
    //    }

    //    if (this.dataForm.value["radioParam"] == "desinstalaciones") {
    //      this._desinstalacionesService.paramDesinst(this.dataForm.value).subscribe(
    //      (data: Heineken_Desinstalaciones[]) => this.desinstList = data
    //    );
    //    }
    //  }
    //}

  }

  onReset() {
    this.submitted = false;
    this.dataForm.reset();
    this.ngOnInit();
    $(document).ready(function () {
      $("#opsheineken").hide();
    });
    
    
  }
  
}
