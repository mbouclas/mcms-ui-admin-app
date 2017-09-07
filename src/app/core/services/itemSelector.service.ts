import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import * as fromItemSelector from "../../store/reducers/itemSelector";
import {Observable} from "rxjs/Observable";
import {IItemSelectorConnector} from "../../store/models/IItemSelector";
import {find} from 'lodash';

@Injectable()
export class ItemSelectorService {
    constructor(private store: Store<fromItemSelector.State>) {

    }

    get(): Observable<IItemSelectorConnector[]> {
        return this.store.select(fromItemSelector.getConnectors);
    }

    getSync(): IItemSelectorConnector[] {
        let connectorsArray = [];

        this.store.select(fromItemSelector.getConnectors)
            .first()
            .subscribe(connectors => connectorsArray = connectors);

        return connectorsArray;
    }

    find(key: string): Observable<IItemSelectorConnector> {
        return this.store.select(fromItemSelector.getConnectors)
            .map((connectors) => find(connectors, {name: key})
            );
    }

    /**
     * Sync helper function
     *
     * @param {string} key
     * @return {IItemSelectorConnector}
     */
    findSync(key: string): IItemSelectorConnector {
        let connector: IItemSelectorConnector;

        this.store.select(fromItemSelector.getConnectors)
            .first()
            .subscribe((connectors) => connector = find(connectors, {name: key}));

        return connector;
    }
}