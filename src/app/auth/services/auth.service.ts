import {Injectable, Injector} from '@angular/core';
import {of} from 'rxjs/observable/of';
import {_throw} from 'rxjs/observable/throw';
import {User, Authenticate} from '../../store/models/User';
import {Store} from "@ngrx/store";
import * as fromAuth from '../../store/reducers/auth';
import * as authActions from '../../store/actions/auth';
import {Cache} from "../../core/services/Cache";
import "rxjs/add/operator/first";
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {AppSettings} from "../../core/configuration/app";
import {extractData, extractError} from "../../core/helpers/http";
import {IBootData} from "../../store/models/IBootApp";



@Injectable()
export class AuthService {
    private http: Http;
    constructor(private store: Store<fromAuth.State>, private cache: Cache, injector: Injector) {
        setTimeout(() => this.http = injector.get(Http));
    }

    login({email, password}: Authenticate) {


    }

    loginFromApi({email, password, remember}: Authenticate): Observable<string> {
        const url = `${AppSettings.API_ENDPOINT}loginUser`;

        return this.http.post(url, {email, password, remember})
            .map(extractData)
            .map((res: any) => res.token)
            .catch(extractError);
    }

    getUserFromApi(userId?: number): Observable<User> {
        const url = AppSettings.API_ENDPOINT + (typeof userId !== 'undefined' && userId) ? `users/${userId}` : 'me';
        return this.http.get(url)
            .map(extractData)
            .map((res: any) => res.data)
            .catch((err: any) => {
                console.log(err);
                return Observable.throw(err);
            });
    }

    bootFromApi(): Observable<IBootData> {
        const url = `${AppSettings.API_ENDPOINT}boot`;
        return this.http.get(url)
            .map(extractData)
            .map((res: any) => res)
            .catch((err: any) => {
                console.log('Boot data error',err);
                return Observable.throw(err);
            });
    }

    logout() {
        return of(true);
    }

    setLoginState() {
        const token = this.cache.get('token');
        if (token) {
            this.store.dispatch(new authActions.StoreTokenAction(token));
        }
    }

    setUser() {
        const cachedUser = this.cache.get('user');
        if (cachedUser) {
            // set the user in our store
            this.store.dispatch(new authActions.SetUserAction(cachedUser));
            return;
        }

        // Go to the API and fetch the user
        this.store.dispatch(new authActions.GetUserAction());
    }


    public getToken() {
        let token: string;
        this.store
            .select(fromAuth.getToken)
            .first()
            .subscribe(s => token = s);


        return token;
    }
}
