import { Action } from '@ngrx/store';

export const OPEN_SIDENAV = '[Layout] Open Sidenav';
export const CLOSE_SIDENAV = '[Layout] Close Sidenav';
export const DEFAULT_TEAM = '[Layout] Default Team';
export const GET_DEFAULT_TEAM = '[Layout] Get Default Team';
export const IN_SETTINGS = '[Layout] In Settings';
export const REFRESH_CACHE = '[Layout] Refresh Cache';

export class OpenSidenavAction implements Action {
    readonly type = OPEN_SIDENAV;
}

export class CloseSidenavAction implements Action {
    readonly type = CLOSE_SIDENAV;
}

export class SetDefaultTeamAction implements Action {
    readonly type = DEFAULT_TEAM;

    constructor(public payload: string) {}
}

export class GetDefaultTeamAction implements Action {
    readonly type = GET_DEFAULT_TEAM;

    constructor() {}
}

export class InSettingsAction implements Action {
    readonly type = IN_SETTINGS;

    constructor(public payload: boolean) {}
}

export class RefreshCacheAction implements Action {
    readonly type = REFRESH_CACHE;

    constructor(public payload: boolean) {}
}

export type Actions = OpenSidenavAction | CloseSidenavAction |
    SetDefaultTeamAction | GetDefaultTeamAction | InSettingsAction | RefreshCacheAction;
