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
import { ConfirmacionDialogoComponent } from './confirmacion-dialogo/confirmacion-dialogo.component';

import { AppComponent } from './app.component';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';

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
        MaterialModule
    ],
    declarations: [
        AppComponent,
        AdminLayoutComponent,
        ConfirmacionDialogoComponent
    ],
    providers: [],
    bootstrap: [AppComponent],
    entryComponents: [ConfirmacionDialogoComponent],
})
export class AppModule { }
