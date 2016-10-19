import {LoadingController} from 'ionic-angular';

export class PageBase {

	constructor(protected loadingCtrl : LoadingController){

	}

	protected presentLoading() {
	    let loader = this.loadingCtrl.create({
	      content: "Please wait..."
	    });

	    loader.present();

	    return loader;
  	}
}