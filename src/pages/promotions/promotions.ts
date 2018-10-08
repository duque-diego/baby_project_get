import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Tabs } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ProductInfoPage } from '../product-info/product-info';
import { ApiPromotionProvider } from '../../providers/api-promotion/api-promotion';
import { MyBabyPage } from '../my-baby/my-baby';

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
  tab: Tabs;
  userData: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public apiPromotionProvider: ApiPromotionProvider,
    public loadingCtrl: LoadingController) {
    //this.ga.trackView("Lista de promoções");
    this.tab = this.navCtrl.parent;
  }

  ionViewDidEnter() {
    if (this.userData) {
      this.getPromotions(this.userData.id);
    } else {
      this.getUserData();
    }
  }

  getUserData() {
    this.storage.get('userData')
      .then(
        data => {
          this.userData = data;
          this.getPromotions(this.userData.id);
        },
        error => console.error(error)
      );
  }

  getPromotions(userId: number) {
    this.loading = this.loadingCtrl.create({
      content: 'Buscando promoções'
    });

    this.loading.present();

    this.apiPromotionProvider.getPromotions(userId).subscribe(
      response => {
        console.log(response);
        this.promotions = response;
        this.loading.dismiss();
      },
      error => {
        console.log(error);
        this.loading.dismiss();
      }
    );
  }

  private goToProductDetail(item) {
    this.navCtrl.push(ProductInfoPage, { productInfo: item });
  }

  private goToSetup() {
    this.tab.select(1);
  }

}
