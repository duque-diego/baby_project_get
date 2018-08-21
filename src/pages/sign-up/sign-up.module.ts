import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignUpPage } from './sign-up';
import { ApiUserProvider } from '../../providers/api-user/api-user-data';
import { NativeStorage } from '@ionic-native/native-storage';

@NgModule({
  declarations: [
    SignUpPage
  ],
  imports: [
    IonicPageModule.forChild(SignUpPage)
  ],
  providers: [
    ApiUserProvider
  ]
})
export class SignUpPageModule {}
