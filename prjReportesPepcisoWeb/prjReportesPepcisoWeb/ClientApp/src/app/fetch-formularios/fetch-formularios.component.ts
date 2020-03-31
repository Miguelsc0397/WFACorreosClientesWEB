import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PepsicoService } from '../services/pepsico.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Pepsico } from '../../models/Pepsico';
import { Employee } from '../../models/employee';
import { ExporterService } from '../services/exporter.service';
import { KOF } from '../../models/kof';
import { KOFService } from '../services/kof.service';
import { HDesInstService } from '../services/hdesinst.service';
import { Heineken_Desinstalaciones } from '../../models/heineken_desinst';
import { HeinekenInstService } from '../services/heineken-inst.service';
import { HeinekenInstalaciones } from '../../models/heineken_inst';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ConfirmacionDialogoComponent } from '../confirmacion-dialogo/confirmacion-dialogo.component';

@Component({
  selector: 'app-fetch-formularios',
  templateUrl: './fetch-formularios.component.html',
  styleUrls: ['./fetch-formularios.component.css']
})
export class FetchFormulariosComponent implements OnInit {

  dataForm: FormGroup;
  submitted = false;
  public pepsicoList: Pepsico[];
  public empList: Employee[];
  public kofList: KOF[];
  public desinstList: Heineken_Desinstalaciones[];
  public instList: HeinekenInstalaciones[];
  titledialog = 'angular-confirmation-dialog';

  constructor(private formBuilder: FormBuilder, private _pepsicoService: PepsicoService,
    private excelService: ExporterService, private _kofService: KOFService,
      private _desinstalacionesService: HDesInstService, private _heinekenInstalacionesService: HeinekenInstService,
      public dialog: MatDialog) { }

    title = 'angulardatatables';
    dtOptions: DataTables.Settings = {};
    get parameter1(): any { return this.dataForm.get('parameter1'); }
    get parameter2(): any { return this.dataForm.get('parameter2'); }

    openDialog(): void {
        const dialogref = this.dialog.open(ConfirmacionDialogoComponent, {
            width: '270px',
            //data: "Se limpiará el resultado de la consulta, ¿ desea continuar ?",
            
        });

        dialogref.afterClosed().subscribe(result => {
            this.onReset();
        });
    }

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
          pageLength: 100,
          processing: true,
          scrollY: "400",
          scrollX: true,
          language: {
              search: "Buscar:",
              lengthMenu: "Mostrar _MENU_ elementos",
              info: "Mostrando desde _START_ al _END_ de _TOTAL_ elementos",
              infoEmpty: "Mostrando ning&uacute;n elemento.",
              infoFiltered: "(filtrado _MAX_ elementos total)",
              paginate: {
                  first: "Primero",
                  previous: "Anterior",
                  next: "Siguiente",
                  last: "&Uacute;ltimo",
                  
              }
          }
      };

    }

    changeParam(e) {

        switch (e.target.value) {
            case "Heineken":
                this.isShown = true;
                this.isMostrar = false;
                this.isMostrarP = false;
                this.isMostrarI = true;
                this.isMostrarD = true;

                break;
            case "Pepsico":
                this.isMostrarI = false;
                this.isMostrarD = false;
                this.isShown = false;
                this.isMostrar = false;
                this.isMostrarP = true;

                break;
            case "KOF":
                this.isMostrarI = false;
                this.isMostrarD = false;
                this.isShown = false;
                this.isMostrar = true;
                this.isMostrarP = false;

                break;
            default:
                this.isShown = false;
                break;
        }
    }

    isMostrarD: boolean = true;
    isMostrarI: boolean = true;
    isMostrar: boolean = true;
    isMostrarP: boolean = true;
    isShown: boolean = false; // hidden by default


  exportAsXLSX(): void {

    if (this.dataForm.value["opcion"] == "Pepsico") {

      this.excelService.exportToExcel(this.pepsicoList, 'Pepsico');

    } else {
      if (this.dataForm.value["opcion"] == "KOF") {

        this.excelService.exportToExcel(this.kofList, 'KOF');

      } else {
        if (this.dataForm.value["opcion"] == "Heineken") {
          if (this.dataForm.value["radioParam"] == "instalaciones") {
            
            this.excelService.exportToExcel(this.instList, 'Heineken_Instalaciones');
          }
        }

        if (this.dataForm.value["radioParam"] == "desinstalaciones") {
          
          this.excelService.exportToExcel(this.desinstList, 'Heineken_Desinstalaciones');
        }
      }
    }
  }

  get f() { return this.dataForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.dataForm.value["opcion"] == "Pepsico") {

      this._pepsicoService.paramPepsico(this.dataForm.value).subscribe(
        (data: Pepsico[]) => this.pepsicoList = data
      );

    } else {
      if (this.dataForm.value["opcion"] == "KOF") {

        this._kofService.paramKOF(this.dataForm.value).subscribe(
          (data: KOF[]) => this.kofList = data
        );

      } else {
        if (this.dataForm.value["opcion"] == "Heineken") {
          if (this.dataForm.value["radioParam"] == "instalaciones") {

            this._heinekenInstalacionesService.paramInst(this.dataForm.value).subscribe(
            (data: HeinekenInstalaciones[]) => this.instList = data
          );

          }
        }

        if (this.dataForm.value["radioParam"] == "desinstalaciones") {
          this._desinstalacionesService.paramDesinst(this.dataForm.value).subscribe(
          (data: Heineken_Desinstalaciones[]) => this.desinstList = data
        );
        }
      }
      }
    }

  onReset() {
    this.submitted = false;
    this.pepsicoList = null;
    this.kofList = null;
    this.instList = null;
    this.desinstList = null;
    this.dataForm.reset();
    this.ngOnInit();
    $(document).ready(function () {
      $("#opsheineken").hide();
    });
    
    
  }

}
