import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromAuth from '../../store/reducers/auth';
import * as authActions from '../../store/actions/auth';
import {FormGroup, FormControl, Validators} from "@angular/forms";



@Component({
    selector: 'mcms-login-page',
    templateUrl: './login-page.component.html',
    styles: [],
})
export class LoginPageComponent implements OnInit {
    error$ = this.store.select(fromAuth.getLoginPageError);

    constructor(private store: Store<fromAuth.State>) {
    }

    loginForm: FormGroup;

    ngOnInit() {
        this.loginForm = new FormGroup({
            'email': new FormControl('', Validators.required),
            'password': new FormControl('', Validators.required),
            'remember': new FormControl(false),
        });
    }

    get email() {
        return this.loginForm.get('email');
    }

    get password() {
        return this.loginForm.get('password');
    }

    get remember() {
        return this.loginForm.get('remember');
    }

    onSubmit($event: Event) {
        $event.preventDefault();

        this.store.dispatch(new authActions.Login(this.loginForm.getRawValue()));
        return false;
    }
}
