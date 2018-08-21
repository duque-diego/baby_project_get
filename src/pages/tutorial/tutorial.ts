import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../../pages/tabs/tabs';

@IonicPage()
@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html',
})
export class TutorialPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TutorialPage');
  }

  private enterApp(){
    this.navCtrl.setRoot(TabsPage);
  }

  slides = [
    {
      title: "O PRIMEIRO PASSO",
      description: "Você já deu o primeiro passo para encontrar as melhores promoções de fraldas e curtir com o seu bebê sem preocupações. :-]",
      image: "assets/imgs/slide1.svg",
      button: "PULAR",
    },
    {
      title: "É MUITO SIMPLES",
      description: "Basta escolher a sua marca e loja de preferência, o tamanho e o valor unitário que você deseja pagar. A gente cuida do resto. :-]",
      image: "assets/imgs/slide2.svg",
      button: "PULAR",
    },
    {
      title: "VAMOS COMEÇAR",
      description: "Agora é hora de economizar! Vamos escolher as suas preferências. Mas fique tranquilo, se você quiser, dá pra mudar tudo depois.",
      image: "assets/imgs/slide3.svg",
      button: "VAMOS LÁ",
    }
  ];

}
