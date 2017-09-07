import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as fromAuth from './auth';
import * as fromAcl from './acl';
import * as fromLoginPage from './login-page';

export interface AuthState {
    status: fromAuth.State;
    loginPage: fromLoginPage.State;
    acl: fromAcl.State
}

export interface State extends fromRoot.State {
    auth: AuthState;
}

export const reducers = {
    status: fromAuth.reducer,
    loginPage: fromLoginPage.reducer,
    acl: fromAcl.reducer
};

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectAuthAclState = createSelector(
    selectAuthState,
    (state: AuthState) => state.acl
);

export const selectAuthStatusState = createSelector(
    selectAuthState,
    (state: AuthState) => state.status
);
export const getLoggedIn = createSelector(
    selectAuthStatusState,
    fromAuth.getLoggedIn
);

export const getToken = createSelector(
    selectAuthStatusState,
    fromAuth.getToken
);
export const getUser = createSelector(selectAuthStatusState, fromAuth.getUser);


export const selectLoginPageState = createSelector(
    selectAuthState,
    (state: AuthState) => state.loginPage
);
export const getLoginPageError = createSelector(
    selectLoginPageState,
    fromLoginPage.getError
);
export const getLoginPagePending = createSelector(
    selectLoginPageState,
    fromLoginPage.getPending
);

export const getRoles = createSelector(
    selectAuthAclState,
    fromAcl.getRoles
);

export const getPermissions = createSelector(
    selectAuthAclState,
    fromAcl.getPermissions
);