import {ISimpleObject} from "./ISimpleObject";

export interface Authenticate {
    email: string;
    password: string;
    remember?: boolean;
}

export interface User {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    username: string
    password?: string,
    settings?: ISimpleObject,
    profile?: ISimpleObject,
    active: boolean,
    awaits_moderation?: boolean,
}