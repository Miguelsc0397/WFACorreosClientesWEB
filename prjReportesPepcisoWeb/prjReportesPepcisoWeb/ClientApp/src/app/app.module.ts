import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './material/material.module';

import { AppRoutingModule } from './app.routing';
import { NavbarModule } from './shared/navbar/navbar.module';
import { FooterModule } from './shared/footer/footer.module';
import { SidebarModule } from './sidebar/sidebar.module';
//import { ConfirmacionDialogoComponent } from './confirmacion-dialogo/confirmacion-dialogo.component';

import { AppComponent } from './app.component';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { ConfirmacionEditComponent } from './confirmacion-edit/confirmacion-edit.component';
import { ModalEditClientescorreosComponent } from './modal-edit-clientescorreos/modal-edit-clientescorreos.component';
import { NotifierModule, NotifierOptions } from "angular-notifier";
import { ConfirmacionLogoutComponent } from './confirmacion-logout/confirmacion-logout.component';
import { ModalAplicacionesPendientesComponent } from './modal-aplicaciones-pendientes/modal-aplicaciones-pendientes.component';
import { ConfirmacionPendientesComponent } from './confirmacion-pendientes/confirmacion-pendientes.component';
import { CancelacionPendientesComponent } from './cancelacion-pendientes/cancelacion-pendientes.component';
import { ConfirmacionDivisionComponent } from './confirmacion-division/confirmacion-division.component';
import { MensajeCambiodivisionComponent } from './mensaje-cambiodivision/mensaje-cambiodivision.component';

const customNotifierOptions: NotifierOptions = {
    position: {
        horizontal: {
            position: 'right',
            distance: 12
        },
        vertical: {
            position: 'top',
            distance: 12,
            gap: 10
        }
    },
    theme: 'material',
    behaviour: {
        autoHide: 5000,
        onClick: 'hide',
        onMouseover: 'pauseAutoHide',
        showDismissButton: true,
        stacking: 4
    },
    animations: {
        enabled: true,
        show: {
            preset: 'slide',
            speed: 300,
            easing: 'ease'
        },
        hide: {
            preset: 'fade',
            speed: 300,
            easing: 'ease',
            offset: 50
        },
        shift: {
            speed: 300,
            easing: 'ease'
        },
        overlap: 150
    }
};


@NgModule({
    imports: [
        BrowserAnimationsModule,
        FormsModule,
        RouterModule,
        HttpClientModule,
        NavbarModule,
        FooterModule,
        SidebarModule,
        ReactiveFormsModule,
        AppRoutingModule,
        MaterialModule,
        NotifierModule.withConfig(customNotifierOptions)
    ],
    declarations: [
        AppComponent,
        AdminLayoutComponent,
        //ConfirmacionDialogoComponent,
        ConfirmacionEditComponent,
        ModalEditClientescorreosComponent,
        ConfirmacionLogoutComponent,
        ModalAplicacionesPendientesComponent,
        ConfirmacionPendientesComponent,
        CancelacionPendientesComponent,
        ConfirmacionDivisionComponent,
        MensajeCambiodivisionComponent
    ],
    providers: [],
    bootstrap: [AppComponent],
    entryComponents: [/*ConfirmacionDialogoComponent,*/ ConfirmacionEditComponent, ModalEditClientescorreosComponent, ConfirmacionLogoutComponent,
        ModalAplicacionesPendientesComponent, ConfirmacionPendientesComponent, CancelacionPendientesComponent,
        ConfirmacionDivisionComponent, MensajeCambiodivisionComponent]
})
export class AppModule { }
