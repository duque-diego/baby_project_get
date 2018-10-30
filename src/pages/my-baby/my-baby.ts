import { ApiPreferenceProvider } from './../../providers/api-preference/api-preference-data';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, App, Tabs } from 'ionic-angular';
import { FraldaModel } from '../../models/fralda-model';
import { TamanhoModel } from '../../models/tamanho-model';
import { LojasModel } from '../../models/lojas-model';
import { Storage } from '@ionic/storage';
import { ApiUserProvider } from '../../providers/api-user/api-user-data';
import { PromotionsPage } from '../promotions/promotions';
import { TabsPage } from '../tabs/tabs';


/**
 * Generated class for the MyBabyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-baby',
  templateUrl: 'my-baby.html',
})
export class MyBabyPage {

  overlayHidden: boolean = true;
  tabBarElement: any;
  preferences: any = {};
  marcas: FraldaModel[] = [];
  tamanhos: TamanhoModel[] = [];
  lojas: LojasModel[] = [];
  bebe: any = {};

  valorUnidadeMaxVar: any;
  receberPromo: boolean = false;
  tab:Tabs;
  userData: any;
  loading: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public apiUserProvider: ApiUserProvider,
    public apiPreferenceProvider: ApiPreferenceProvider,
    public alertController: AlertController,
    public loadingCtrl: LoadingController,
    public app:App
  ) {
      this.tab = this.navCtrl.parent;
  }

  ionViewDidLoad() {
    this.loading = this.loadingCtrl.create({
      content: 'Buscando preferências'
    });

    this.loading.present();

    this.apiPreferenceProvider.getAllPreferences().subscribe(
      res => {
        this.getUserData(res);
      },
      err => {
        console.log(err);
        this.lojas = [];
        this.loading.dismiss();
      }
    );
  }

  public getUserData(allPreferences) {
    this.storage.get('userData')
      .then(
        data => {
          this.userData = data;
          this.marcas = this.formatPreferenceArray(data['marcas'], allPreferences['marcas']);
          this.tamanhos = this.formatPreferenceArray(data['tamanhos'], allPreferences['tamanhos']);
          this.lojas = this.formatPreferenceArray(data['lojas'], allPreferences['lojas']);
          this.bebe = this.formatBebeData();
          this.valorUnidadeMaxVar = this.userData.valorUnidadeMax ? (this.userData.valorUnidadeMax + '').replace('.', ',') : null;
          this.receberPromo = this.userData.receberPromo;
      
          this.loading.dismiss();
        },
        error => {
          console.error(error);
          this.loading.dismiss();
        }
      );
  }

  public formatPreferenceArray(savedPref: any[], allPref: any[]) {
    if (savedPref && allPref) {
      for (let i = 0; i < allPref.length; i++) {
        allPref[i]['checada'] = false;

        for (let j = 0; j < savedPref.length; j++) {
          if (savedPref[j]['id'] == allPref[i]['id']) {
            allPref[i]['checada'] = true;
            break;
          }
        }
      }
    }

    return allPref;
  }

  public formatBebeData() {
    let bebeFormatted: any = {};

    if (this.userData && this.userData.bebes && this.userData.bebes.length > 0) {
      bebeFormatted = this.userData.bebes[0];
      bebeFormatted.dataNascimento = this.formatZuluDate(bebeFormatted.dataNascimento).toISOString();
      if(this.userData.bebes[0].peso){
        bebeFormatted.peso = this.userData.bebes[0].peso.toFixed(3);  
      }
    }

    return bebeFormatted;
  }

  private formatZuluDate(dateStr) {
    var a = dateStr.split(/[^0-9]/);
    return new Date (a[0],a[1]-1,a[2],a[3],a[4],a[5]);
  }

  public hideOverlay() {
    this.overlayHidden = true;
  }

  public showOverlay() {
    if (this.overlayHidden) {
      this.overlayHidden = false;
      this.tabBarElement.style.display = 'none';
    } else {
      this.overlayHidden = true;
      this.tabBarElement.style.display = 'flex';
    }
  }

  public setFraldaChecked(event, index: number) {
    this.marcas[index].checada = event.checked;
  }

  public setLojaChecked(event, index: number) {
    this.lojas[index].checada = event.checked;
  }

  public selecionaTamanho(index: number) {
    if (this.tamanhos[index].checada) {
      this.tamanhos[index].checada = false;
    } else {
      this.tamanhos[index].checada = true;
    }
  }

  public sendPreferences(valUnidadeMax) {
    this.loading = this.loadingCtrl.create({
      content: 'Realizando cadastro...'
    });

    this.loading.present();

    this.userData.marcas = this.marcas.filter(item => item.checada);
    this.userData.tamanhos = this.tamanhos.filter(item => item.checada);
    this.userData.lojas = this.lojas.filter(item => item.checada);

    this.userData.valorUnidadeMax = valUnidadeMax ? valUnidadeMax.replace(',', '.') : null;
    this.userData.receberPromo = this.receberPromo;

    let bebeFormatted = Object.assign({}, this.bebe);
    this.userData.bebes = [];
    this.userData.bebes[0] = bebeFormatted;
    // this.userData.bebes[0].peso = this.userData.bebes[0].peso.toFixed(3);

    this.apiUserProvider.updateUserData(this.userData).subscribe(
      response => {
        this.storage.set("userData", response);
        this.loading.dismiss();
        this.presentConfirm();
      }, error => {
        this.loading.dismiss();
      });
  }

  private presentConfirm() {
    let alert = this.alertController.create({
      title: 'Atualização realizada com sucesso!',
      message: 'Vamos monitorar os preços e te avisar quando encontrarmos fraldas em promoção.',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.tab.select(0);
          }
        }
      ]
    });
    alert.present();
  }

  presentError() {
    let alert = this.alertController.create({
      title: 'Erro ao ralizar cadastro',
      message: 'Por favor revise seus dados',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    alert.present();
  }



}
