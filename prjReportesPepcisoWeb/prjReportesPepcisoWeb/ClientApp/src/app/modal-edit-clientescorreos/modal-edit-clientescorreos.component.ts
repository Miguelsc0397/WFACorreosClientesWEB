import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ClientesFiltro } from '../../models/clientesfiltro';
import { ClientesFiltroService } from '../services/clientesfiltro.service';

export interface DialogData {
    numerocliente: string;
    nombrecliente: string;
    pagos: boolean;
    correosactuales: string;
    correosnuevos: string;
}


@Component({
  selector: 'app-modal-edit-clientescorreos',
  templateUrl: './modal-edit-clientescorreos.component.html',
  styleUrls: ['./modal-edit-clientescorreos.component.scss']
})


export class ModalEditClientescorreosComponent implements OnInit {

    editProfileForm: FormGroup;
    submitted = false;

    constructor(
        public dialogRef: MatDialogRef<ModalEditClientescorreosComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData, private formBuilder: FormBuilder, private _clientesService: ClientesFiltroService) { }

    ngOnInit() {
        this.editProfileForm = this.formBuilder.group({
            numerocliente: [''],
            nombrecliente: [''],
            correosactuales: [''],
            correosnuevos: ['', Validators.required],
            pagos: [false]
        }, {
        });

        //this.editProfileForm = this.formBuilder.group({
        //    numerocliente: new FormControl({ value: '', disabled: true }, Validators.required),
        //    nombrecliente: new FormControl({ value: '', disabled: true }),
        //    correosactuales: new FormControl({ value: '', disabled: true }),
        //    correosnuevos: new FormControl({ value: '' }),
        //    pagos: new FormControl({ value: false })
        //});
  }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onEnviar() {
        this.submitted = true;

        if (this.editProfileForm.invalid) {
            return;
        }

        this._clientesService.updateClientesCorreos(this.editProfileForm.value)
            .subscribe(() => {
                //this._router.navigate(['/clientesfiltro']);
                //this.dialogRef.close();

                this.dialogRef.close({ data: this.data }) // send data to parent component
            }, error => console.error(error));

    }
}
