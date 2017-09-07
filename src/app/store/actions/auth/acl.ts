import {Action} from "@ngrx/store";
import {IUserPermission, IUserRole} from "../../models/User";

export const ACL_SET_ROLES = '[ACL] Set Roles';
export const ACL_SET_PERMISSIONS = '[ACL] Set Permissions';

export class AclSetRolesAction implements Action {
    readonly type = ACL_SET_ROLES;

    constructor(public payload: IUserRole[]) {}
}

export class AclSetPermissionsAction implements Action {
    readonly type = ACL_SET_PERMISSIONS;

    constructor(public payload: IUserPermission[]) {}
}

export type Actions =
    AclSetRolesAction
    | AclSetPermissionsAction;