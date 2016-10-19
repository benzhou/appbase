export class LoginState {
	private _accessToken : string;
	private _refreshToken : string;
	private _expiredOn : Date

	constructor(accessToken : string, refreshToken: string, expiredOn : Date){
		this._accessToken = accessToken;
		this._refreshToken = refreshToken;
		this._expiredOn = expiredOn;
	}

	public get accessToken() : string{
		return this._accessToken;
	}

	public get refreshToken() : string{
		return this._refreshToken;
	}

	public get expiredOn() : Date{
		return this._expiredOn;
	}
}