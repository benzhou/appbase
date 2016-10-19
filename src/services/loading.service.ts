import { Injectable } from '@angular/core';
import {LoadingController} from 'ionic-angular';

@Injectable()
export class LogService{

    constructor(private loadingCtrl: LoadingController) {
        
    }
}