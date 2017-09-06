import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";

@Injectable()
export class OauthResolverService implements Resolve<any> {
    constructor() {}
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): any {
        console.log(1)
    }}