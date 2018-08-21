import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ProductInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product-info',
  templateUrl: 'product-info.html',
})
export class ProductInfoPage {

  overlayHidden: boolean = true;
  tabBarElement: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductInfoPage');
  }
  public hideOverlay() {
    this.overlayHidden = true;
  }

  public showOverlay(){

    if(this.overlayHidden){
      this.overlayHidden = false;
      this.tabBarElement.style.display = 'none';
    }else{
      this.overlayHidden = true;
      this.tabBarElement.style.display = 'flex';
    }
  }

}
