import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {McmsCoreModule} from 'mcms-ui-core';
import {FormsModule} from "@angular/forms";
import {Http, HttpModule} from "@angular/http";
import {RouterModule} from "@angular/router";
import {CoreModule} from "./core/core.module";
import {routes} from "./routes";
import {AuthModule} from "./auth/auth.module";
import {StoreModule} from "@ngrx/store";
import {RouterStateSerializer, StoreRouterConnectingModule} from "@ngrx/router-store";
import {environment} from "../environments/environment";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {EffectsModule} from "@ngrx/effects";
import { reducers } from './store/reducers';
import {AuthGuard} from "./auth/services/auth-guard.service";
import {ExtendedHttpService} from "./core/services/Http.service";
import {CustomRouteSerializer} from "./core/services/RouterSerializer";
import {Cache} from "./core/services/Cache";
import {AppComponent} from "./core/containers/app";


@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot(routes, { useHash: true }),
        StoreModule.forRoot(reducers),
        StoreRouterConnectingModule,
        !environment.production ? StoreDevtoolsModule.instrument() : [],
        EffectsModule.forRoot([]),
        CoreModule.forRoot(),
        AuthModule.forRoot(),
        McmsCoreModule.forRoot()
    ],
    providers: [
        AuthGuard,
        Cache,
        { provide: Http, useClass: ExtendedHttpService },
        { provide: RouterStateSerializer, useClass: CustomRouteSerializer } // override router-store
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
