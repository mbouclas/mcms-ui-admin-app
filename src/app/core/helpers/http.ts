import {_throw} from 'rxjs/observable/throw';
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/of";
export interface LaravelApiErrorResponse {
    ok: boolean;
    _body: string;
    url: string;
    headers: object;
}

export interface LaravelApiError {
    message: string,
    errors?: object,
    error?: object,
    [key:string]: any
}

export function extractData(res: Response|any) {
    const body = res.json();
    return body || {};
}

export function extractError(res: LaravelApiErrorResponse): Observable<LaravelApiError> {
    return Observable.throw(JSON.parse(res._body));
}