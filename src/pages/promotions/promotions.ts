import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
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
  loading: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public apiPromotionProvider: ApiPromotionProvider,
    public loadingCtrl: LoadingController) {}

  ionViewDidLoad() {
    this.loading = this.loadingCtrl.create({
      content: 'Buscando promoções'
    });

    this.loading.present();

    this.apiPromotionProvider.getPromotions().subscribe(
      response => {
        console.log(response);
        this.promotions = response;
        this.loading.dismiss();
      },
      error => {
        console.log(error);
        this.loading.dismiss();
      }
    )
  }

  private goToProductDetail(item){
    this.navCtrl.push(ProductInfoPage, { productInfo: item });
  }

}
