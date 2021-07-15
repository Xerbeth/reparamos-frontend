/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Module */
import { TablesModule } from './tables.module';

/* Containers */
import * as tablesContainers from './containers';

/* Guards */
import * as tablesGuards from './guards';
import { SBRouteData } from '@modules/navigation/models';

/* Routes */
export const ROUTES: Routes = [
    {
        path: 'reparaciones',
        canActivate: [],
        component: tablesContainers.TablesComponent,
        data: {
            title: 'Inicio - Reparamos',
            breadcrumbs: [
                {
                    text: 'Inicio',
                    link: '/app',
                },
                {
                    text: 'Reparaciones',
                    active: true,
                },
            ],
        } as SBRouteData,
    },
    {
        path: 'reportes',
        canActivate: [],
        component: tablesContainers.ReportesComponent,
        data: {
            title: 'Inicio - Reparamos',
            breadcrumbs: [
                {
                    text: 'Inicio',
                    link: '/app',
                },
                {
                    text: 'Reportes',
                    active: true,
                },
            ],
        } as SBRouteData,
    },
    {
        path: 'gestion-clientes',
        canActivate: [],
        component: tablesContainers.GestionClienteComponent,
        data: {
            title: 'Inicio - Reparamos',
            breadcrumbs: [
                {
                    text: 'Inicio',
                    link: '/app',
                },
                {
                    text: 'Gestion Clientes',
                    active: true,
                },
            ],
        } as SBRouteData,
    },
];

@NgModule({
    imports: [TablesModule, RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class TablesRoutingModule {}
