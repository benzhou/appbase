export class UserAccessToken {
	private _accessToken : number;
	private _expiredOn : Date;

	constructor(accessToken, expiredOn){
		this._accessToken = accessToken;
		this._expiredOn = expiredOn;
	}
}