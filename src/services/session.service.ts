import { Injectable } from '@angular/core';
import { UserAccessToken } from '../models/userAccessToken.model';
import { User } from '../models/user.model';
import { LoginState } from '../models/loginState.model';
import {LocalStorageService, SessionStorageService} from 'ng2-webstorage';
import {LogService} from '../services/log.service';
import {AppSettings} from '../config/app-settings';

@Injectable()
export class SessionService{
    
    private _logger;
    private _localst;

    private _user;
    private _loginState : LoginState;

    constructor(private localst: LocalStorageService, private logger: LogService, private config : AppSettings) {
    	this._localst = localst;
    	this._logger = logger;
    }

    public setLoginState(at : string, rt : string, eo : Date){
    	this._loginState = new LoginState(at, rt, eo);

    	this._writeLoginStateStorage(this._loginState);
    }

    public getLoginState(): LoginState{
    	this._loginState = this._readStorage();
    	return this._loginState;
    }

    public isLoggedIn() : boolean{
    	let ls = this.getLoginState();

    	return ls && ls.accessToken && ls.expiredOn > (new Date());
    }

    public logout(): void{
        this._clearLoginStateStorage();
    }

    private _readStorage() : LoginState {
    	let loginState = this._localst.retrieve(this.config.authCookieKey);
    	this._logger.log.debug('read storage, loginState: ', loginState);

    	return loginState;
    }

    private _clearLoginStateStorage():void{
        this._localst.clear(this.config.authCookieKey);
        this._logger.log.debug('Cleared storage');
    }

    private _writeLoginStateStorage(ls : LoginState): void{
    	this._localst.store(this.config.authCookieKey, ls);
    	this._logger.log.debug('stored storage, loginState: ', ls);
    }
}