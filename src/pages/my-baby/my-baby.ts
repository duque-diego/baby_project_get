import { ApiPreferenceProvider } from './../../providers/api-preference/api-preference-data';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { FraldaModel } from '../../models/fralda-model';
import { TamanhoModel } from '../../models/tamanho-model';
import { LojasModel } from '../../models/lojas-model';
import { Storage } from '@ionic/storage';
import { ApiUserProvider } from '../../providers/api-user/api-user-data';


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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public apiUserProvider: ApiUserProvider,
    public apiPreferenceProvider: ApiPreferenceProvider,
    public alertController: AlertController,
    public loadingCtrl: LoadingController,
  ) { }

  ionViewDidLoad() {
    // this.storage.get('userData')
    //   .then(
    //     data => {

    //       if (data.preferencias) {
    //         this.preferences = data.preferencias;
    //         this.fraldas = data.preferencias.fraldas;
    //         this.tamanhos = data.preferencias.tamanhos;
    //         this.lojas = data.preferencias.lojas;
    //         console.log(data);
    //       } else {
    //         this.fraldas.push(new FraldaModel(1, "Pampers", false));
    //         this.fraldas.push(new FraldaModel(2, "Pom Pom", false));
    //         this.fraldas.push(new FraldaModel(3, "Huggies", false));
    //         this.fraldas.push(new FraldaModel(4, "Cremer", false));
    //         this.fraldas.push(new FraldaModel(5, "Capricho", false));
    //         this.fraldas.push(new FraldaModel(6, "Personal", false));
    //         this.fraldas.push(new FraldaModel(7, "MammyPoko", false));
    //         this.fraldas.push(new FraldaModel(8, "Johnson's Baby", false));

    //         this.lojas.push(new LojasModel(1, "Americanas", false));
    //         this.lojas.push(new LojasModel(2, "Carrefour", false));
    //         this.lojas.push(new LojasModel(3, "Onofre", false));
    //         this.lojas.push(new LojasModel(4, "Drogasil", false));
    //         this.lojas.push(new LojasModel(5, "Bebê Store", false));
    //         this.lojas.push(new LojasModel(6, "Wallmart", false));
    //         this.lojas.push(new LojasModel(7, "Onofre", false));
    //         this.lojas.push(new LojasModel(8, "Magazine Luiza", false));

    //         this.tamanhos.push(new TamanhoModel(1, "RN", false));
    //         this.tamanhos.push(new TamanhoModel(2, "P", false));
    //         this.tamanhos.push(new TamanhoModel(3, "M", false));
    //         this.tamanhos.push(new TamanhoModel(4, "G", false));
    //         this.tamanhos.push(new TamanhoModel(5, "XG", false));
    //         this.tamanhos.push(new TamanhoModel(6, "XXG", false));

    //       }
    //     },
    //     error => console.error(error)
    //   );

    this.apiPreferenceProvider.getAllPreferences().subscribe(
      res => {
        console.log(res);

        this.marcas = res['marcas'];
        this.tamanhos = res['tamanhos'];
        this.lojas = res['lojas'];
      },
      err => {
        console.log(err);
        this.lojas = [];
      }
    );
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
    console.log(this.marcas[index]);
  }

  public setLojaChecked(event, index: number) {
    this.lojas[index].checada = event.checked;
    console.log(this.lojas[index]);
  }

  public selecionaTamanho(index: number) {
    if (this.tamanhos[index].checada) {
      this.tamanhos[index].checada = false;
    } else {
      this.tamanhos[index].checada = true;
    }
  }

  public sendPreferences() {
    this.preferences.lojas = this.lojas;
    this.preferences.tamanhos = this.tamanhos;
    this.preferences.fraldas = this.marcas;
    console.log(this.preferences);

    //this.storage.set("preferences", this.preferences);


    let loading = this.loadingCtrl.create({
      content: 'Realizando cadastro...'
    });

    loading.present();
    this.storage.get('userData')
      .then(
        data => {
          data.preferencias = this.preferences;
          this.apiUserProvider
            .updateUserData(data)
            .subscribe(response => {
              this.storage.set("userData", response);
              loading.dismiss();
              this.presentConfirm();
            }, error => {
              loading.dismiss();
            })
        },
        error => console.error(error)
      );

  }

  private presentConfirm() {
    let alert = this.alertController.create({
      title: 'Atualização de Cadastro Realizada',
      message: 'Você alterou seus dados com suscesso!',
      buttons: [
        {
          text: 'Ok'
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
