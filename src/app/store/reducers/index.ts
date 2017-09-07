import {
    ActionReducerMap,
    createSelector,
    createFeatureSelector,
    ActionReducer,
} from '@ngrx/store';
import { environment } from '../../../environments/environment';

/**
 * Every reducer module's default export is the reducer function itself. In
 * addition, each module should export a type or interface that describes
 * the state of the reducer plus any selector functions. The `* as`
 * notation packages up all of the exports into a single object.
 */

import * as fromLayout from './layout';
import * as fromLang from './lang';
import * as fromSettings from './settings';
import * as fromItemSelector from './itemSelector';
import {routerReducer, RouterReducerState} from "@ngrx/router-store";


/**
 * As mentioned, we treat each reducer like a table in a database. This means
 * our top level state interface is just a map of keys to inner state types.
 */
export interface State {
    routerReducer: RouterReducerState,
    layout: fromLayout.State;
    lang: fromLang.State;
    settings: fromSettings.State;
    itemSelector: fromItemSelector.State
}

/**
 * Our state is composed of a map of action reducer functions.
 * These reducer functions are called with each dispatched action
 * and the current or initial state and return a new immutable state.
 */
export const reducers: ActionReducerMap<State> = {
    routerReducer,
    layout: fromLayout.reducer,
    lang: fromLang.reducer,
    settings: fromSettings.reducer,
    itemSelector: fromItemSelector.reducer
};


/**
 * By default, @ngrx/store uses combineReducers with the reducer map to compose
 * the root meta-reducer. To add more meta-reducers, provide an array of meta-reducers
 * that will be composed to form the root meta-reducer.
 */
export const metaReducers: ActionReducer<any, any>[] = !environment.production
    ? []
    : [];

/**
 * Layout Reducers
 */
export const getLayoutState = createFeatureSelector<fromLayout.State>('layout');
export const getLangState = fromLang.getLangState;
export const getSettingsState = fromSettings.getSettingsState;
export const getItemSelectorState = fromItemSelector.getItemSelectorState;

export const getShowSidenav = createSelector(
    getLayoutState,
    fromLayout.getShowSidenav
);

export const getDefaultTeam = createSelector(
    getLayoutState,
    fromLayout.getDefaultTeam
);

export const getInSettings = createSelector(
    getLayoutState,
    fromLayout.getInSettings
);

export const getRefreshCache = createSelector(
    getLayoutState,
    (state) => state.refreshCache
);
