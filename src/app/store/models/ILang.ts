import {ISimpleObject} from "./ISimpleObject";
export interface ILocales {
    [key:string]: ILocale
}

export interface ILocale {
    name: string,
    script: string,
    native: string,
    regional: string,
    code: string,
    "default": boolean
}

export interface ITranslationValues {
    [key: string]: ISimpleObject
}