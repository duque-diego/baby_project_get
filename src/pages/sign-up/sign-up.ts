import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, TextInput, LoadingController, AlertController } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UserModel } from '../../models/user-model';
import { ApiUserProvider } from '../../providers/api-user/api-user-data';
import { AuthLoginPage } from '../auth-login/auth-login';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the SignUpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {

  private passwordInput: any;
  private confirmPasswordInput: any;
  private viewPasswordValue: boolean;
  private viewConfirmPasswordValue: boolean;
  private profileData: any = {};
  registerForm: FormGroup;

  @ViewChild("phoneInput") private phoneInput: ElementRef;
  @ViewChild("cpfInput") private cpfInput: ElementRef;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private formBuilder: FormBuilder, 
    public apiUserProvider:ApiUserProvider,
    public loadingCtrl: LoadingController,
    public alertController: AlertController,
    public storage:Storage) {

      this.profileData.phone="";
      this.profileData.cpf="";
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpPage');
    
  }

  ngOnInit() {

    this.registerForm = this.formBuilder.group({
      nameVal: ['', Validators.required ],
      emailVal: ['', Validators.required],
      cpfVal: [Validators.required],
      phoneVal: [],
      passwordVal: ['', Validators.required],
      confirmPasswordVal: ['', Validators.required]
    });
  }

  private toggleViewPassword(event) {
    this.viewPasswordValue = !this.viewPasswordValue;
    this.updatePasswordInputType(event);
  }

  private updatePasswordInputType(event) {
    const inputType = this.viewPasswordValue ? "text" : "password";
    event.currentTarget.previousElementSibling.type = inputType;
  }

  private toggleConfirmPassword(event) {
    this.viewConfirmPasswordValue = !this.viewConfirmPasswordValue;
    this.updateConfirmPasswordInputType(event);
  }

  private updateConfirmPasswordInputType(event) {
    const inputType = this.viewConfirmPasswordValue ? "text" : "password";
    event.currentTarget.previousElementSibling.type = inputType;
  }

  private registerUser(){

    if(this.validadePassword()){
      let { 
        nameVal, 
        emailVal, 
        cpfVal, 
        phoneVal,
        passwordVal,
        confirmPasswordVal
      } = this.registerForm.controls;

      let user = new UserModel(
    
        this.profileData.id,
        this.profileData.name,
        this.profileData.email,
        this.phoneInput.nativeElement.value,
        this.cpfInput.nativeElement.value,
        this.profileData.password
      );

      console.log(user);

      let loading = this.loadingCtrl.create({
        content: 'Realizando cadastro...'
      }); 

      loading.present();

      this.apiUserProvider
                  .registerUser(user)
                  .subscribe(response => {
                    loading.dismiss();
                    this.storage.set('userData', response)
                    .then(
                      () => console.log('Stored item!'),
                      error => console.error('Error storing item', error)
                    );
                    this.presentConfirm();
                    //user = response
                  });
    }
  }

  private validadePassword(): boolean{
    if(this.profileData.password != this.profileData.confirmPassword){
      this.presentConfirmPassword();
      return false;
    }
    return true;
  }

  private saveButtonEnabled() {
    return !this.registerForm.valid;
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

  private presentConfirm() {
    let alert = this.alertController.create({
      title: 'Cadastro Realizado',
      message: 'Você será redirecionado para realizar o login.',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.navCtrl.push(AuthLoginPage);
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
