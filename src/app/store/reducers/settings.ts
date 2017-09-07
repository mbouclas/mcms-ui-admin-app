import * as settings from '../actions/settings';
import {createFeatureSelector, createSelector} from "@ngrx/store";
import {ISystemSettings} from "../models/ISystemSettings";

export interface State extends ISystemSettings{}

const initialState: State = {
    core:{ siteName: '' },
    site: {url: ''}
};

export const getSettingsState = createFeatureSelector<State>('settings');

export function reducer(state = initialState, action: settings.Actions): State {
    switch (action.type) {
        case settings.SETTINGS_SET: {
            return {
                ...state,
                core: action.payload.core,
                site: action.payload.site
            };
        }

        case settings.SITE_SETTINGS_SET: {
            return {
                ...state,
                site: action.payload,
            };
        }

        case settings.CORE_SETTINGS_SET: {
            return {
                ...state,
                core: action.payload,
            };
        }

        default: return state;
    }
}

export const getAllSettings = createSelector(
    getSettingsState,
    (state: State) => state
);

export const getSiteSettings = createSelector(
    getSettingsState,
    (state: State) => state.site
);

export const getCoreSettings = createSelector(
    getSettingsState,
    (state: State) => state.core
);

