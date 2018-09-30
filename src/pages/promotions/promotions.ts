import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public apiPromotionProvider: ApiPromotionProvider,
    public loadingCtrl: LoadingController) {
      //this.ga.trackView("Lista de promoções");
    }

  ionViewDidLoad() {
    this.getUserData();
    //this.ga.trackView("Lista de promoções");
  }

  getUserData() {
    this.storage.get('userData')
      .then(
        data => {
          this.getPromotions(data.id);
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

  private goToSetup(){
    this.navCtrl.push(MyBabyPage);
  }

}
