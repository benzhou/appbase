import { Component } from '@angular/core';
import {ModalController, NavController, LoadingController} from 'ionic-angular';
//import {FORM_DIRECTIVES, FormBuilder,  ControlGroup, Validators, AbstractControl} from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import {usersService, LoginResponse} from '../../services/users.service';
import {LogService} from '../../services/log.service';
import {SessionService} from '../../services/session.service';
import { ValidationService } from '../../services/validation.service';

import {TabsPage} from '../tabs/tabs';
import {SignupPage} from '../signup/signup';
import {PageBase} from '../page.base';


@Component({
    templateUrl: 'login.html'
})
export class LoginPage extends PageBase {
    loginForm: any;
    
    constructor(
        private nav: NavController , 
        private user: usersService, 
        private logger: LogService, 
        private sessionSvc : SessionService, 
        private formBuilder: FormBuilder, 
        public modalCtrl: ModalController, 
        public loadingCtrl: LoadingController) {
        super(loadingCtrl);

        this.loginForm = formBuilder.group({  
            'username': ['', Validators.compose([Validators.required, ValidationService.emailValidator])],
            'password': ['', Validators.compose([Validators.required, Validators.minLength(3)])]
        });

        this.logger.log.debug('loginForm: ', this.loginForm);
    }

    ngOnInit(){
        this.logger.log.debug('login page ngOnInit ');
        if(this.sessionSvc.isLoggedIn()){
            this.logger.log.debug('loginForm this._nav: ', this.nav);
            this.nav.push(TabsPage);
        }
    }

    signup(event){
        this.logger.log.debug('Sign up clicked!',event);

        let signUpModal = this.modalCtrl.create(SignupPage);
        signUpModal.present();
    }

    login(loginForm:any/*username, password*/) {
        let loader = super.presentLoading();
        this.logger.log.debug('login fuc called. ');
        this.logger.log.debug('Submitted value: ', loginForm);

        this.user.login(loginForm.username, loginForm.password).finally(() => { 
            this.logger.log.debug("finally called. ");
             
            loader.dismiss();
        }).subscribe((data: LoginResponse) => {
            this.sessionSvc.setLoginState(data.user.accessToken.accessToken, data.user.accessToken.refreshToken, data.user.accessToken.expiredOn);

            this.nav.push(TabsPage);
        }, err => {
            this.logger.log.info('error when login:', err);
        });
    }
}