import { Component } from '@angular/core';
import { ViewController, NavController, LoadingController} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import {usersService, SignUpResponse} from '../../services/users.service';
import {LogService} from '../../services/log.service';
import {SessionService} from '../../services/session.service';
import { ValidationService } from '../../services/validation.service';
import {PageBase} from '../page.base';
import {TabsPage} from '../tabs/tabs';

import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

@Component({
    templateUrl: 'signup.html'
})
export class SignupPage extends PageBase{

	signUpForm : any;

	constructor(
        private nav: NavController,
        private userSvc: usersService, 
        private logger: LogService, 
        private sessionSvc : SessionService, 
        private formBuilder: FormBuilder, 
        public viewCtrl: ViewController, 
        public loadingCtrl: LoadingController) {
		super(loadingCtrl);

        this.signUpForm = formBuilder.group({  
            'email': ['', Validators.compose([Validators.required, ValidationService.emailValidator])],
            'password': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
            'confirmPassword': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
            'firstname': ['', Validators.compose([])], 
            'lastname': ['', Validators.compose([])]
        });
    }

    signUp(signUpData){
    	this.logger.log.info("signUp fuc cliecked." , signUpData);
    	let loader = super.presentLoading();

    	try{
    		this.userSvc.signup(signUpData.email, signUpData.password, signUpData.firstname, signUpData.lastname).finally(() => { 
    			this.logger.log.debug("finally called. ");
    			 
    			loader.dismiss();
    		}).subscribe((data : SignUpResponse) => {
				this.logger.log.debug("signup result data: ", data);

    			this.sessionSvc.setLoginState(data.user.accessToken.accessToken, data.user.accessToken.refreshToken, data.user.accessToken.expiredOn);

                this.nav.push(TabsPage);
    		}, (e) => {
    			this.logger.log.debug("signup had an error : ", e);
    			//loader.dismiss();
    		}, () => {
    			this.logger.log.debug("signup complete 1. ");
    			//loader.dismiss();
    		});
    	}catch(e){
    		this.logger.log.error("sing up error: ", e);
    	}
    }

    cancel(){
    	this.logger.log.info("cancel fuc cliecked.");
    	this.viewCtrl.dismiss();
    }

}