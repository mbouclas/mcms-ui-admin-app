import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import {CanActivate, NavigationStart, Router} from '@angular/router';
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/of";


@Injectable()
export class OAuthGuard implements CanActivate {
    constructor(private router:Router) {}

    canActivate(): Observable<boolean> {

        this.router.events.subscribe(event => {

            if(event instanceof NavigationStart) {

            }
        });

        return Observable.of(false);
    }
}
