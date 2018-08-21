import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import { UserModel } from '../../models/user-model'
import { AuthLoginPage } from '../auth-login/auth-login';
import { SignUpPage } from '../sign-up/sign-up';
import { TutorialPage } from '../../pages/tutorial/tutorial';
import { Storage } from '@ionic/storage';
import { ApiUserProvider } from '../../providers/api-user/api-user-data';


@IonicPage()
@Component({
  selector: 'page-autenticacao',
  templateUrl: 'autenticacao.html'
})

export class AutenticacaoPage {
  constructor(
    public facebook: Facebook, 
    public navCtrl:NavController, 
    public storage:Storage, 
    public loadingCtrl: LoadingController,
    public alertController: AlertController,
    public apiUserProvider:ApiUserProvider) {
    //atribuicao do pacote do facebook
    
  }

  loginEmail() {
    this.navCtrl.push(AuthLoginPage);
  }

  presentSignUp() {
    this.navCtrl.push(SignUpPage);
  }

  //método para chamar api do facebook e salvar no banco o usuario    
  loginFacebook() {
     let permissions = new Array<string>();
     permissions = ["public_profile", "email"];

     this.facebook.login(permissions).then((response) => {
      let params = new Array<string>();

      this.facebook.api("/me?fields=name,email", params)
      .then(res => {

          //estou usando o model para criar os usuarios
          let usuario = new UserModel(res.id, res.name, res.email, null, "face", null);
          // usuario.nome = res.name;
          // usuario.email = res.email;
          // usuario.senha = res.id;
          // usuario.login = res.email;
        
          this.logar(usuario);
      }, (error) => {
        
        console.log('ERRO LOGIN: ',error);
      })
    }, (error) => {
      console.log('ERRO LOGIN: ',error);
    });
  }

  logar(usuario: UserModel) {
    // this.salvarService.salvarFacebook(usuario)
    // .then(() => {
    //     console.log('Usuario cadastrado via facebook com sucesso!');
    // })

    

    console.log(usuario);

    let loading = this.loadingCtrl.create({
      content: 'Realizando cadastro...'
    }); 

    loading.present();

    this.apiUserProvider
                .registerUser(usuario)
                .subscribe(response => {
                  loading.dismiss();
                  this.storage.set('userData', response);
                  this.navCtrl.setRoot(TutorialPage)
                  .then(
                    () => console.log('Stored item!'),
                    error => console.error('Error storing item', error)
                  );
                  //this.presentConfirm();
                  //user = response
                });


    
  }

  // private presentConfirm() {
  //   let alert = this.alertController.create({
  //     title: 'Cadastro Realizado',
  //     message: 'Você será redirecionado para realizar o login.',
  //     buttons: [
  //       {
  //         text: 'Ok',
  //         handler: () => {
  //           this.navCtrl.push(AuthLoginPage);
  //         }
  //       }
  //     ]
  //   });
  //   alert.present();
  // }

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
