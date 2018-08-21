import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ApiUserProvider } from '../../providers/api-user/api-user-data';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  overlayHidden: boolean = true;
  tabBarElement: any;
  private profileData: any = {};
  private isFormChanged: boolean = false;
  private viewConfirmPasswordValue: boolean;
  private viewPasswordValue: boolean;
  private savedPassword:boolean;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public storage:Storage,
    public loadingCtrl: LoadingController,
    public alertController: AlertController,
    public apiUserProvider:ApiUserProvider) {
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    this.storage.get('userData')
                    .then(
                      data => {
                        this.profileData = data; 
                        this.savedPassword = data.senha;
                        console.log(data)
                      },
                      error => console.error(error)
                    );
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

  private onChanges(){
    this.isFormChanged = true;
  }

  private saveButtonEnabled():boolean {
    return this.isFormChanged;
  }

  private updateUser(){

    if(this.validadePassword()){

      let loading = this.loadingCtrl.create({
        content: 'Realizando cadastro...'
      }); 

      loading.present();
      this.apiUserProvider
        .updateUserData(this.profileData)
        .subscribe(response => {
          this.storage.set("userData", response); 
          loading.dismiss();
          this.presentConfirm();
        }, error => {
          loading.dismiss();
        })
    }
  }

  private presentConfirm() {
    let alert = this.alertController.create({
      title: 'Atualização de Cadastro Realizada',
      message: 'Você alterou seus dados com suscesso!',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.isFormChanged = false;
            this.saveButtonEnabled();
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

  private toggleConfirmPassword(event) {
    this.viewConfirmPasswordValue = !this.viewConfirmPasswordValue;
    this.updateConfirmPasswordInputType(event);
  }

  private updateConfirmPasswordInputType(event) {
    const inputType = this.viewConfirmPasswordValue ? "text" : "password";
    event.currentTarget.previousElementSibling.type = inputType;
  }

  private toggleViewPassword(event) {
    this.viewPasswordValue = !this.viewPasswordValue;
    this.updatePasswordInputType(event);
  }

  private updatePasswordInputType(event) {
    const inputType = this.viewPasswordValue ? "text" : "password";
    event.currentTarget.previousElementSibling.type = inputType;
  }

  private validadePassword(){
    
    if(this.savedPassword != this.profileData.senha){
      if(this.profileData.senha != this.profileData.confirmPassword){
        this.presentConfirmPassword();
        return false;
      }
    }
    return true;
  }

  private presentConfirmPassword() {
    let alert = this.alertController.create({
      title: 'Confirmação de senha',
      message: 'Os dados de senha não conferem.',
      buttons: [
        {
          text: 'Ok'
        }
      ]
    });
    alert.present();
  }

}
