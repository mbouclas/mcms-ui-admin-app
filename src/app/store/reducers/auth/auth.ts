import * as auth from '../../actions/auth';
import { User } from '../../models/User';

export interface State {
    loggedIn: boolean;
    user: User | null;
    token: string;
}

export const initialState: State = {
    loggedIn: false,
    user: null,
    token: null
};

export function reducer(state = initialState, action: auth.Actions): State {
    switch (action.type) {
        case auth.LOGIN_SUCCESS: {
            return {
                ...state,
                loggedIn: true,
                token: action.payload,
            };
        }

        case auth.LOGOUT: {
            return initialState;
        }

        case auth.STORE_TOKEN: {
            // In case the token was not properly retrieved
            if (typeof action.payload === 'undefined' || !action.payload) {
                return state;
            }

            return {
                ...state,
                loggedIn: true,
                token: action.payload
            }
        }

        case auth.SET_TOKEN: {
            // In case the token was not properly retrieved
            if (typeof action.payload === 'undefined' || !action.payload) {
                return state;
            }

            return {
                ...state,
                token: action.payload
            }
        }

        case auth.SET_USER: {
            // In case the token was not properly retrieved
            if (typeof action.payload === 'undefined' || !action.payload) {
                return state;
            }

            return {
                ...state,
                user: action.payload
            }
        }

        default: {
            return state;
        }
    }
}

export const getLoggedIn = (state: State) => state.loggedIn;
export const getToken = (state: State) => state.token;
export const getUser = (state: State) => state.user;
