import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductInfoPage } from '../product-info/product-info';
import { ApiPromotionProvider } from '../../providers/api-promotion/api-promotion';

/**
 * Generated class for the PromotionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-promotions',
  templateUrl: 'promotions.html',
})
export class PromotionsPage {

  promotions: any = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public apiPromotionProvider: ApiPromotionProvider) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad PromotionsPage');

    this.apiPromotionProvider.getPromotions().subscribe(
      response => {
        console.log('Promotions');
        console.log(response);

        this.promotions = response;
      },
      error => {
        console.log(error);
      }
    )

  }

  private goToProductDetail(){
    this.navCtrl.push(ProductInfoPage);
  }

}
