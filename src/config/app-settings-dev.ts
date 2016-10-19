import {Injectable} from "@angular/core";
import {AppSettingsBase} from "./app-settings-base";
 
@Injectable()
export class AppSettings extends AppSettingsBase {
  constructor() {
    super();
    this.apiUrl = 'http://localhost:8888';
  }
}