import {IUserPermission, IUserRole} from "../../models/User";
import * as acl from '../../actions/auth/acl';

export interface State {
    permissions: IUserPermission[];
    roles: IUserRole[]
}

export const initialState: State = {
    permissions: [],
    roles: []
};

export function reducer(state = initialState, action: acl.Actions): State {
    switch (action.type) {
        case acl.ACL_SET_ROLES: {
            return {
                ...state,
                roles: action.payload,
            };
        }

        case acl.ACL_SET_PERMISSIONS: {
            return {
                ...state,
                permissions: action.payload,
            };
        }

        default: {
            return state;
        }
    }
}

export const getRoles = (state: State) => state.roles;
export const getPermissions = (state: State) => state.permissions;