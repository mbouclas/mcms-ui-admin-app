import {Injectable, Injector} from '@angular/core';
import { Request, XHRBackend, RequestOptions, Response, Http, RequestOptionsArgs, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {AuthService} from "../../auth/services/auth.service";
import {Store} from "@ngrx/store";
import * as fromAuth from '../../store/reducers/auth';
import {isPending} from "q";
import {extractError, LaravelApiErrorResponse} from "../helpers/http";

@Injectable()
export class ExtendedHttpService extends Http {

    constructor(backend: XHRBackend, defaultOptions: RequestOptions,
                 private authService: AuthService, private injector: Injector, private store: Store<fromAuth.State>) {
        super(backend, defaultOptions);
    }

    public get router(): Router { //this creates router property on your service.
        return this.injector.get(Router);
    }

    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        //do whatever
        if (typeof url === 'string') {
            if (!options) {
                options = { headers: new Headers() };
            }
            this.setHeaders(options);
        } else {
            this.setHeaders(url);
        }

        return super.request(url, options).catch(this.catchErrors());
    }

    private catchErrors() {
        return (res: Response|any) => {
            this.store.select(fromAuth.getLoginPagePending)
                .subscribe((loginIsPending: boolean) => {
                    if (loginIsPending) {
                        console.log('still logging in, abort redirect');
                        return;
                    }

                    if (res.status === 401 || res.status === 403) {

                        // I am navigating to logout route which brings the login screen
                        this.router.navigate(['/logout']);
                    }

                    return Observable.throw(res);
                });

            return Observable.throw(res);
        };
    }

    private setHeaders(objectToSetHeadersTo: Request | RequestOptionsArgs) {
        //add whatever header that you need to every request
        //in this case I add header token by using authService that I've created
        if (this.authService.getToken()) {
            objectToSetHeadersTo.headers.set('Authorization', `Bearer ${this.authService.getToken()}`);
        }
    }
}