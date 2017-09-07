import {Injectable} from "@angular/core";
import {Actions, Effect} from "@ngrx/effects";
import {AuthService} from "../../auth/services/auth.service";
import {Store} from "@ngrx/store";
import {of} from "rxjs/observable/of";
import {Cache} from "../../core/services/Cache";

@Injectable()
export class LayoutEffects {
/*
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
*/

    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private cache: Cache,
        // private store: Store<fromLayout.State>
    ) {}
}