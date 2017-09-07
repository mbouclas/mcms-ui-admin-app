import { Action } from '@ngrx/store';
import { User, Authenticate } from '../../models/User';

export const BOOT = '[Auth] Boot';
export const LOGIN = '[Auth] Login';
export const LOGOUT = '[Auth] Logout';
export const LOGIN_SUCCESS = '[Auth] Login Success';
export const LOGIN_FAILURE = '[Auth] Login Failure';
export const LOGIN_REDIRECT = '[Auth] Login Redirect';
export const STORE_TOKEN = '[Auth] Store Token';
export const GET_TOKEN = '[Auth] GET Token';
export const SET_TOKEN = '[Auth] SET Token';
export const GET_USER = '[Auth] GET User';
export const SET_USER = '[Auth] SET User';

export class BootAction implements Action {
    readonly type = BOOT;

    constructor() {}
}

export class Login implements Action {
    readonly type = LOGIN;

    constructor(public payload: Authenticate) {}
}

export class LoginSuccess implements Action {
    readonly type = LOGIN_SUCCESS;

    constructor(public payload: string) {}
}

export class LoginFailure implements Action {
    readonly type = LOGIN_FAILURE;

    constructor(public payload: any) {}
}

export class LoginRedirect implements Action {
    readonly type = LOGIN_REDIRECT;
}

export class Logout implements Action {
    readonly type = LOGOUT;
}

export class StoreTokenAction implements Action {
    readonly type = STORE_TOKEN;

    constructor(public payload: string) {}
}

export class GetTokenAction implements Action {
    readonly type = GET_TOKEN;

    constructor() {}
}

export class SetTokenAction implements Action {
    readonly type = SET_TOKEN;

    constructor(public payload: string) {}
}

export class GetUserAction implements Action {
    readonly type = GET_USER;

}

export class SetUserAction implements Action {
    readonly type = SET_USER;

    constructor(public payload: User) {}
}

export type Actions =
    | BootAction
    | Login
    | LoginSuccess
    | LoginFailure
    | LoginRedirect
    | Logout
    | StoreTokenAction
    | SetTokenAction
    | GetTokenAction
    | GetUserAction
    | SetUserAction;
