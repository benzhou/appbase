//http://coenraets.org/blog/2016/02/angular2-ionic2-rest-services/

import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

import {AppSettings} from '../config/app-settings';
import {LogService} from '../services/log.service';

export class ResponseBase{
	public success : boolean;
	public errorCode : number;
	public errorMsg	 : string;
}

export class AccessToken{
	public accessToken : string;
	public refreshToken : string;
	public expiredOn : Date;
	public userId	: number;
}

export class User{
	public id : number;
	public username : string;
	public accessToken : AccessToken;
}

export class SignUpResponse extends ResponseBase{
	public user : User;
}

export class LoginResponse extends ResponseBase{
	public user : User;
}

@Injectable()
export class usersService {

	private http : Http;

	constructor (http:Http, private logger: LogService, private config: AppSettings) {
        this.http = http;
    }

    login(email, password) : Observable<LoginResponse> {
        return this.http.post(this.config.apiUrl + "/api/users/login", {
        	username: email,
        	password: password
        }).map(res => {
        	this.logger.log.debug('map res for POST login:', res);
        	let data = res.json() as LoginResponse;
        	this.logger.log.debug('map data for POST login:', data);
        	return data;
        }).catch(this.handleError);
    }

    signup(email, password, firstname, lastname) : Observable<SignUpResponse>{
    	return this.http.post(this.config.apiUrl + "/api/users/signup", {
    		username : email,
    		password : password,
    		firstname : firstname,
    		lastname : lastname
    	}).catch((e) => {
    		this.logger.log.error('Got an error when call POST signup:', e);
    		return Observable.throw(e);
    	}).map(res => {
    		this.logger.log.debug('map res for POST signup:', res);
    		let body = res.json() as SignUpResponse;
    		this.logger.log.debug('map res for POST signup body:', body);
    		return body;
    	});
    }
 
/*    favorite(property) {
        let body = JSON.stringify(property);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(favoritesURL, body, options)
            .map(res => res.json())
            .catch(this.handleError);
    }
*/ 
    handleError(error) {
        return Observable.throw(error);
    }

}