import {Action} from "@ngrx/store";
import {ICoreSystemSettings, ISiteSystemSettings, ISystemSettings} from "../models/ISystemSettings";
import {ISimpleObject} from "../models/ISimpleObject";

export const SETTINGS_SET = '[SETTINGS] Set Settings';
export const SITE_SETTINGS_SET = '[SETTINGS] Set Site Settings';
export const CORE_SETTINGS_SET = '[SETTINGS] Set Core Settings';

export class SettingsSetAction implements Action {
    readonly type = SETTINGS_SET;

    constructor(public payload: ISystemSettings) {}
}

export class SiteSettingsSetAction implements Action {
    readonly type = SITE_SETTINGS_SET;

    constructor(public payload: ISiteSystemSettings) {}
}

export class CoreSettingsSetAction implements Action {
    readonly type = CORE_SETTINGS_SET;

    constructor(public payload: ICoreSystemSettings) {}
}



export type Actions =
    | SettingsSetAction
    | CoreSettingsSetAction
    | SiteSettingsSetAction;