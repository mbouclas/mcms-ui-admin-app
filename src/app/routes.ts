import { Routes } from '@angular/router';
import { AuthGuard } from './auth/services/auth-guard.service';
import { NotFoundPageComponent } from './core/containers/not-found-page';
import {LayoutComponent} from "./core/components/layout";


export const routes: Routes = [
    { path: '', component: LayoutComponent, canActivate: [ AuthGuard ] },
/*    {
        path: 'logs',
        loadChildren: './logs/logs.module#LogsModule',
        canActivate: [ AuthGuard ]
    },*/
    { path: '**', component: NotFoundPageComponent },
];