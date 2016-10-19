import { Component } from '@angular/core';

import { NavController, App } from 'ionic-angular';
import {SessionService} from '../../services/session.service';

import { LoginPage } from '../login/login';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  constructor(
  	private app : App,
  	public navCtrl: NavController,
  	private sessionSvc : SessionService) {

  }

  public logout(){
  	this.sessionSvc.logout();

  	let root = this.app.getRootNav();
    root.popToRoot();
  }

}
