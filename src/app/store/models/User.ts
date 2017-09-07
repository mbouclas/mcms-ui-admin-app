import {ISimpleObject} from "./ISimpleObject";

export interface Authenticate {
    email: string;
    password: string;
    remember?: boolean;
}

export interface IUserRole {
    id: number;
    name: string;
    display_name: string;
    level: number;
    created_at?: string|Date;
    updated_at?: string|Date;
    pivot?: {
        user_id: number;
        role_id: number
    }
}

export interface IUserPermission {
    id: number;
    name: string;
    display_name: string;
    description: string;
    created_at?: string|Date;
    updated_at?: string|Date;
    pivot?: {
        user_id: number;
        permission_id: number
    }
}

export interface IUserExtraFieldValue {
    id: number,
    item_id: number,
    extra_field_id: number,
    model: string,
    value: string,
    created_at: string|Date,
    updated_at: string|Date
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
    active?: boolean,
    awaits_moderation?: boolean,
    roles?: IUserRole[],
    permissions?: IUserPermission[]
}
