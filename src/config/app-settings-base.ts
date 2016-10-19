//https://danielsaidi.wordpress.com/2016/05/12/ionic-2-build-configuration-specific-application-settings/
import {Injectable} from "@angular/core";

@Injectable()
export class AppSettingsBase {
  public apiUrl: string;
  public authCookieKey : string;
  constructor() {
  	this.authCookieKey = "gb_ls";
  }
}