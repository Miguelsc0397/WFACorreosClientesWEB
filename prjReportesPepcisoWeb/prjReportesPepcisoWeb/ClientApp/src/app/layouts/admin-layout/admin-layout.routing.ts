import { Routes } from '@angular/router';

import { HomeComponent } from '../../home/home.component';
import { UserComponent } from '../../user/user.component';
import { TablesComponent } from '../../tables/tables.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { FetchPepsicoComponent } from '../../fetch-pepsico/fetch-pepsico.component';
import { FetchKOFComponent } from '../../fetch-kof/fetch-kof.component';
import { FetchHeinekenInstalacionesComponent } from '../../fetch-heineken-inst/fetch-heineken-inst.component';
import { FetchHDesinstComponent } from '../../fetch-heineken-desinst/fetch-hdesinst.component';
import { FetchChecklistazulComponent } from '../../fetch-checklistazul/fetch-checklistazul.component';
import { FetchFormulariosComponent } from '../../fetch-formularios/fetch-formularios.component';
import { FetchInicioCheckComponent } from '../../fetch-iniciocheck/fetch-iniciocheck.component';
import { LoginComponent } from '../../login/login.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'home',      component: HomeComponent },
    { path: 'user',           component: UserComponent },
    { path: 'table',          component: TablesComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent },
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'fetch-pepsico', component: FetchPepsicoComponent },
    { path: 'fetch-kof', component: FetchKOFComponent },
    { path: 'fetch-hinstalaciones', component: FetchHeinekenInstalacionesComponent },
    { path: 'fetch-hdesinstalaciones', component: FetchHDesinstComponent },
    { path: 'fetch-checklistazul', component: FetchChecklistazulComponent },
    { path: 'formularios', component: FetchFormulariosComponent },
    { path: 'iniciocheck', component: FetchInicioCheckComponent },
    { path: 'login', component: LoginComponent }
];
