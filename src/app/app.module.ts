import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';

import {Ng2Webstorage} from 'ng2-webstorage';
import {AppSettings} from '../config/app-settings';
import {LogService} from '../services/log.service';
import {usersService} from '../services/users.service';
import {SessionService} from '../services/session.service';


import { EqualValidator } from '../directives/equalValidator';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    SignupPage,
    EqualValidator
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    Ng2Webstorage
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    SignupPage
  ],
  providers: [
    AppSettings,
    LogService,
    usersService, 
    SessionService
  ]
})
export class AppModule {}
