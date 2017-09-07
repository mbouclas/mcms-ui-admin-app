import {ChangeDetectionStrategy, Component, OnInit} from "@angular/core";
import * as fromRoot from '../../store/reducers';
import * as fromLang from '../../store/reducers/lang';
import * as authActions from '../../store/actions/auth';
import {Store} from "@ngrx/store";
import {AuthService} from "../../auth/services/auth.service";
import {Cache} from "../services/Cache";
import {LangService} from "../services/Lang.service";
import {Observable} from "rxjs/Observable";
import {ILocale} from "../../store/models/ILang";

@Component({
    selector: 'mcms-app',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div>
            
            <router-outlet></router-outlet>
        </div>
    `,
})
export class AppComponent implements OnInit{

    // showSidenav$: Observable<boolean>;
    // loggedIn$: Observable<boolean>;
    // refreshData$: Observable<boolean>;



    constructor(private store: Store<fromRoot.State>,
                private authService: AuthService,
                private cache: Cache) {



        /**
         * Selectors can be applied with the `select` operator which passes the state
         * tree to the provided selector
         */
        // this.showSidenav$ = this.store.select(fromRoot.getShowSidenav);
        // this.loggedIn$ = this.store.select(fromAuth.getLoggedIn);
        // this.refreshData$ = this.store.select(fromLayout.getRefreshCache);

        // When we are called to refresh our data, run the Init routine
/*        this.refreshData$.subscribe((newVal) => {
            console.log(`New refreshData value is ${newVal}`);
        });*/

    }

    ngOnInit(): void {
        this.authService.setLoginState();
        const token = this.cache.get('token');
        if (token) {
            // We need to wait for the stupid authService to get an instance of the Http class as
            // we can't inject it there cause of a cyclic dependency bug
            setTimeout(() => {this.store.dispatch(new authActions.BootAction);});

        }
    }

    closeSidenav() {
        /**
         * All state updates are handled through dispatched actions in 'container'
         * components. This provides a clear, reproducible history of state
         * updates and user interaction through the life of our
         * application.
         */
        // this.store.dispatch(new layout.CloseSidenavAction());
    }

    openSidenav() {
        // this.store.dispatch(new layout.OpenSidenavAction());
    }

    logout() {
        this.closeSidenav();

        // this.store.dispatch(new Auth.Logout());
    }


}
