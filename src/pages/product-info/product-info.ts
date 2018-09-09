import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';

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

  productInfo: any = {};
  overlayHidden: boolean = true;
  tabBarElement: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public inAppBrowser: InAppBrowser) {

    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    this.productInfo = navParams.get('productInfo');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductInfoPage');
  }

  goToStore() {
    const options: InAppBrowserOptions = {
      zoom: 'no'
    };

    if (this.productInfo.promoLink) {
      this.inAppBrowser.create(this.productInfo.promoLink, '_blank', options);
    }
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
