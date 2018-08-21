import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, TextInput, LoadingController, AlertController } from 'ionic-angular';
import { TutorialPage } from '../../pages/tutorial/tutorial';
import { ApiUserProvider } from '../../providers/api-user/api-user-data';
import { LoginModel } from '../../models/login-model';
import { FormBuilder, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-auth-login',
  templateUrl: 'auth-login.html',
})
export class AuthLoginPage {

  password: any;
  private viewPasswordValue: boolean;
  overlayHidden: boolean = true;
  public loginForm: any;
  private loginValue: string;
  private passwordValue: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private loadingCtrl: LoadingController, 
    public apiUserProvider: ApiUserProvider, 
    public alertController: AlertController, 
    public formBuilder: FormBuilder,
    public storage:Storage) {
    this.loginForm = formBuilder.group({
      id: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AuthLoginPage');
  }

  private toggleViewPassword(event) {
    this.viewPasswordValue = !this.viewPasswordValue;
    this.updatePasswordInputType(event);
  }

  private updatePasswordInputType(event) {
    const inputType = this.viewPasswordValue ? "text" : "password";
    event.currentTarget.previousElementSibling.type = inputType;
  }

  private loginEmail(){
    this.navCtrl.push(TutorialPage);
  }

  public hideOverlay() {
    this.overlayHidden = true;
  }

  public showOverlay(){
    this.overlayHidden = false;
  }

  private doLogin() {
    
    let { id, password } = this.loginForm.controls;

    if (this.loginForm.valid) {
      let loading = this.loadingCtrl.create({
        content: 'Realizando login...'
      }); 
  
      loading.present();
  
      let loginModel = new LoginModel(this.loginValue, this.passwordValue);
      this.
      apiUserProvider
                  .loginUser(loginModel)
                  .subscribe(response => {
  
                    this.apiUserProvider.getUserData(this.loginValue)
                        .subscribe(response => {
                          loading.dismiss();
                          this.navCtrl.setRoot(TutorialPage, {userData : response});
                          this.storage.set("userData", response); 
                        }, error => {
                          loading.dismiss();
                          this.presentError();
                        })
                  }, error => {
                    loading.dismiss();
                    this.presentError();
                  });
    }
  }

  private presentError() {
    let alert = this.alertController.create({
      title: 'Erro ao ralizar login',
      message: 'Por favor revise seus dados',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        }
      ]
    });
    alert.present();
  }

  private loginButtonEnabled() {
    return !this.loginForm.valid;
  }

}
