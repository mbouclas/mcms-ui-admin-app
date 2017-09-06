import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import * as fromLayout from '../../store/reducers';
import * as layoutActions from '../../store/actions/layout';
import "rxjs/add/operator/first";

@Injectable()
export class Cache {
    constructor(private store: Store<fromLayout.State>){}

    enableRefresh(): void {
        this.store.dispatch(new layoutActions.RefreshCacheAction(true));
    }

    disableRefresh() {
        this.store.dispatch(new layoutActions.RefreshCacheAction(false));
    }

    getRefresh(): boolean {
        let status: boolean;
        this.store
            .select(fromLayout.getRefreshCache)
            .first()
            .subscribe(s => status = s);


        return status;
    }

    get(key: string) {
        // localeStorage converts everything into strings. Parse the above
        const res = window.localStorage.getItem(key);
        return JSON.parse(res);
    }

    set(key: string, value: any): void {
        return window.localStorage.setItem(key, JSON.stringify(value));
    }

    forget(key: string): void {
        return window.localStorage.removeItem(key);
    }

    clear(): void {
        return window.localStorage.clear();
    }
}