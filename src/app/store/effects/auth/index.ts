import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/exhaustMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {Effect, Actions} from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { AuthService } from '../../../auth/services/auth.service';
import * as Auth from '../../actions/auth';
import * as AclActions from '../../actions/auth/acl';
import * as SettingsActions from '../../actions/settings';
import * as ItemSelectorActions from '../../actions/itemSelector';
import * as LangActions from '../../actions/lang';
import * as fromAuth from "../../reducers/auth";
import "rxjs/add/operator/mergeMap";
import {Cache} from "../../../core/services/Cache";
import "rxjs/add/operator/switchMap";
import {Store} from "@ngrx/store";
import "rxjs/add/operator/startWith";
import {User} from "../../models/User";
import {IBootData} from "../../models/IBootApp";
import {LangService} from "../../../core/services/Lang.service";


@Injectable()
export class AuthEffects {
    @Effect()
    boot$ = this.actions$
        .ofType<Auth.BootAction>(Auth.BOOT)
        .switchMap((query) => {
            return this.authService
                .bootFromApi()
                .map((response: IBootData) => {
                    this.cache.set('user', response.user);
                    this.store.dispatch(new AclActions.AclSetPermissionsAction(response.ACL.permissions));
                    this.store.dispatch(new AclActions.AclSetRolesAction(response.ACL.roles));
                    // Lang Stuff
                    this.store.dispatch(new LangActions.LangSetLocaleAction(response.currentLocale));
                    this.store.dispatch(new LangActions.LangSetTranslationsAction(response.translations.en));
                    this.store.dispatch(new LangActions.LangSetLocalesAction(this.langService.localesToArray(response.locales)));
                    // System settings
                    this.store.dispatch(new SettingsActions.SettingsSetAction(response.Settings));
                    // Item Selector
                    this.store.dispatch(new ItemSelectorActions.ItemSelectorSetAction(response.ItemSelector.connectors));

                    return new Auth.SetUserAction(response.user);
                })
                .catch(error => of(new Auth.LoginFailure(error)));
        });

    @Effect()
    fetch$ = this.actions$
        .ofType<Auth.GetUserAction>(Auth.GET_USER)
        .switchMap((query) => {
            return this.authService
                .getUserFromApi()
                .map((user: User) => {
                    this.cache.set('user', user);
                    return new Auth.SetUserAction(user);
                })
                .catch(error => of(new Auth.LoginFailure(error)));
        });

    @Effect()
    login$ = this.actions$
        .ofType(Auth.LOGIN)
        .map((action: Auth.Login) => action.payload)
        .exhaustMap(auth =>
            this.authService
                .loginFromApi(auth)
                .map(token => {
                    this.store.dispatch(new Auth.StoreTokenAction(token));
                    // Boot the app
                    this.store.dispatch(new Auth.BootAction());
                    return new Auth.LoginSuccess(token);
                })
                .catch(error => of(new Auth.LoginFailure(error)))
        );

    @Effect({ dispatch: false })
    saveToken$ = this.actions$
        .ofType<Auth.StoreTokenAction>(Auth.STORE_TOKEN)
        .map(action => action.payload)
        .mergeMap(token => {
            this.cache.set('token', token);
            return of();
        })
        .catch(err => {console.log('store_token err', err); return of()});

    @Effect({ dispatch: false })
    logout$ = this.actions$
        .ofType(Auth.LOGOUT)
        .map(q => {
            this.cache.clear();
            return of();
        })
        .do(() => {this.router.navigate(['/login']);})
        .catch(err => {console.log('store_token err', err); return of()});

    @Effect({ dispatch: false })
    loginSuccess$ = this.actions$
        .ofType(Auth.LOGIN_SUCCESS)
        .do(() => this.router.navigate(['/']));


    @Effect({ dispatch: false })
    loginRedirect$ = this.actions$
        .ofType(Auth.LOGIN_REDIRECT, Auth.LOGOUT)
        .do(authed => {
            this.router.navigate(['/login']);
        });

    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private router: Router,
        private cache: Cache,
        private store: Store<fromAuth.State>,
        private langService: LangService
    ) {}
}
