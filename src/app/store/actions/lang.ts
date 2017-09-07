import {Action} from "@ngrx/store";
import {ILocale, ILocales} from "../models/ILang";
import {ISimpleObject} from "../models/ISimpleObject";

export const LANG_SET_LOCALE = '[LANG] Set Locale';
export const LANG_SET_LOCALES = '[LANG] Set Locales';
export const LANG_SET_TRANSLATIONS = '[LANG] Set Translations';

export class LangSetLocaleAction implements Action {
    readonly type = LANG_SET_LOCALE;

    constructor(public payload: string) {}
}

export class LangSetLocalesAction implements Action {
    readonly type = LANG_SET_LOCALES;

    constructor(public payload: ILocale[]) {}
}

export class LangSetTranslationsAction implements Action {
    readonly type = LANG_SET_TRANSLATIONS;

    constructor(public payload: ISimpleObject) {}
}

export type Actions =
    | LangSetLocaleAction
    | LangSetLocalesAction
    | LangSetTranslationsAction;