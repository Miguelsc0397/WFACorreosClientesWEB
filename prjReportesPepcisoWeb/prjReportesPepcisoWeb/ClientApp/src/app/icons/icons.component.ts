import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//import { PepsicoService } from '../services/pepsico.service';
//import { ActivatedRoute, Router } from '@angular/router';
//import { ExporterService } from '../services/exporter.service';
//import { KOFService } from '../services/kof.service';
//import { HDesInstService } from '../services/hdesinst.service';
//import { HeinekenInstService } from '../services/heineken-inst.service';

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.css']
})
export class IconsComponent implements OnInit {

  dataForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder) { }

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
  }

  get f() { return this.dataForm.controls; }

  onSubmit() {
    this.submitted = true;

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
