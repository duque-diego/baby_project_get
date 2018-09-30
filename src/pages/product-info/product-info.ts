import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { SocialSharing } from '@ionic-native/social-sharing';

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
    public inAppBrowser: InAppBrowser,
    private socialSharing: SocialSharing) {

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

    if (this.productInfo.promotionLink) {
      this.inAppBrowser.create(this.productInfo.promotionLink, '_blank', options);
    }
  }

  public hideOverlay() {
    this.overlayHidden = true;
  }

  private shareApp(){
    this.socialSharing.shareViaWhatsApp('Olá estou usando o promoFraldas e encontrei uma promoção ótima para você aproveitar. Baixe pelo link: www.promocaodefraldas.com', '', 'www.promocaodefraldas.com').then(() => {
      console.log("compartilhou");
    }).catch(() => {
      console.log("deu ruim");
    });    
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
