import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LbdModule } from '../../lbd/lbd.module';
import { NguiMapModule} from '@ngui/map';

import { AdminLayoutRoutes } from './admin-layout.routing';

import { HomeComponent } from '../../home/home.component';
import { UserComponent } from '../../user/user.component';
import { TablesComponent } from '../../tables/tables.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';

import { DataTablesModule } from 'angular-datatables';
import { ExporterService } from '../../services/exporter.service';
import { FetchPepsicoComponent } from '../../fetch-pepsico/fetch-pepsico.component';
import { FetchKOFComponent } from '../../fetch-kof/fetch-kof.component';
import { FetchHeinekenInstalacionesComponent } from '../../fetch-heineken-inst/fetch-heineken-inst.component';
import { FetchHDesinstComponent } from '../../fetch-heineken-desinst/fetch-hdesinst.component';
import { FetchChecklistazulComponent } from '../../fetch-checklistazul/fetch-checklistazul.component';
import { FetchFormulariosComponent } from '../../fetch-formularios/fetch-formularios.component';
import { FetchInicioCheckComponent } from '../../fetch-iniciocheck/fetch-iniciocheck.component';
import { LoginComponent } from '../../login/login.component';
import { ClientesFiltroComponent } from '../../clientes-filtro/clientes-filtro.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    LbdModule,
    ReactiveFormsModule,
    DataTablesModule,
    NguiMapModule.forRoot({ apiUrl: 'https://maps.google.com/maps/api/js?key=YOUR_KEY_HERE' }),
  ],
  declarations: [
    HomeComponent,
    UserComponent,
    TablesComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
    FetchPepsicoComponent,
    FetchKOFComponent,
    FetchHeinekenInstalacionesComponent,
    FetchHDesinstComponent,
    FetchChecklistazulComponent,
    FetchFormulariosComponent,
    FetchInicioCheckComponent,
    LoginComponent,
    ClientesFiltroComponent
    ],
    providers: [ExporterService],
    exports: [RouterModule]
})

export class AdminLayoutModule {}
