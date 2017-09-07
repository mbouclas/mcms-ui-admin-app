import * as lang from '../actions/lang';
import {createFeatureSelector, createSelector} from "@ngrx/store";
import {ISimpleObject} from "../models/ISimpleObject";
import {ILocale} from "../models/ILang";

export interface State {
    currentLocale: string;
    translations: ISimpleObject;
    locales: ILocale[]
}

const initialState: State = {
    currentLocale: 'en',
    translations: {},
    locales: []
};

export const getLangState = createFeatureSelector<State>('lang');

export function reducer(state = initialState, action: lang.Actions): State {
    switch (action.type) {
        case lang.LANG_SET_LOCALE: {
            return {
                ...state,
                currentLocale: action.payload,
            };
        }

        case lang.LANG_SET_LOCALES: {
            return {
                ...state,
                locales: action.payload,
            };
        }

        case lang.LANG_SET_TRANSLATIONS: {
            return {
                ...state,
                translations: action.payload,
            };
        }

        default: return state;
    }
}

export const getCurrentLocale = createSelector(
    getLangState,
    (state: State) => state.currentLocale
);

export const getLocales = createSelector(
    getLangState,
    (state: State) => state.locales
);

export const geTranslations = createSelector(
    getLangState,
    (state: State) => state.translations
);
