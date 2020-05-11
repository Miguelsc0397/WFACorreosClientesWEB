import { Routes } from '@angular/router';

import { HomeComponent } from '../../home/home.component';
import { UserComponent } from '../../user/user.component';
import { TablesComponent } from '../../tables/tables.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { ClientesFiltroComponent } from '../../clientes-filtro/clientes-filtro.component';
import { ComplementoPagoComponent } from '../../complemento-pago/complemento-pago.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'home', component: HomeComponent},
    { path: 'user',           component: UserComponent },
    { path: 'table',          component: TablesComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent },
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'clientesfiltro', component: ClientesFiltroComponent },
    { path: 'complementopago', component: ComplementoPagoComponent }
];
