import {ModuleWithProviders, NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {LoginFormComponent} from "./components/login-form.component";
import {LoginPageComponent} from "./components/login-page.component";
import {RouterModule} from "@angular/router";
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import { reducers } from '../store/reducers/auth';
import {AuthService} from "./services/auth.service";
import {AuthGuard} from "./services/auth-guard.service";
import {AuthEffects} from "../store/effects/auth";
import {LogoutComponent} from "./components/logout.component";
import {ObjNgFor} from "../core/pipes/objNgFor";

export const COMPONENTS = [LoginPageComponent, LoginFormComponent, LogoutComponent, ObjNgFor];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild([
            { path: 'login', component: LoginPageComponent },
            { path: 'logout', component: LogoutComponent },
        ]),
        StoreModule.forFeature('auth', reducers),
        EffectsModule.forFeature([AuthEffects]),
    ],
    declarations: COMPONENTS,
    exports: COMPONENTS,
})
export class AuthModule {

    static forRoot(): ModuleWithProviders {
        return {
            ngModule: AuthModule,
            providers: [AuthService, AuthGuard],
        };
    }
}