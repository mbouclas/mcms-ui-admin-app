import {Component} from "@angular/core";
import {Router} from "@angular/router";
import * as fromAuth from '../../store/reducers/auth';
import * as authActions from '../../store/actions/auth';
import {Store} from "@ngrx/store";

@Component({
    template: `<div></div>`
})
export class LogoutComponent {

    constructor(private store: Store<fromAuth.State>) {
        this.store.dispatch(new authActions.Logout());
    }
}