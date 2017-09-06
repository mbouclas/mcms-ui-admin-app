import * as layout from '../actions/layout';
import {createFeatureSelector, createSelector} from "@ngrx/store";

export interface State {
    showSideNav: boolean;
    defaultTeam: string;
    inSettings: boolean;
    refreshCache: boolean;
}

const initialState: State = {
    showSideNav: false,
    defaultTeam: null,
    inSettings: false,
    refreshCache: false
};

export const getLayoutState = createFeatureSelector<State>('layout');

export function reducer(state = initialState, action: layout.Actions): State {
    switch (action.type) {
        case layout.REFRESH_CACHE:
            return Object.assign({}, state, {
                refreshCache: action.payload
            });
        case layout.IN_SETTINGS:
            return Object.assign({}, state, {
                inSettings: action.payload
            });
        case layout.DEFAULT_TEAM:
            return Object.assign({}, state, {
                defaultTeam: action.payload
            });
        case layout.GET_DEFAULT_TEAM:
            return state;
        default:
            return state;
    }

}

export const getRefreshCache = createSelector(
    getLayoutState,
    (state: State) => state.refreshCache
);

export const getDefaultTeam = createSelector(
    getLayoutState,
    (state: State) => state.defaultTeam
);

export const getInSettings = (state: State) => state.inSettings;
export const getShowSidenav = (state: State) => state.showSideNav;
