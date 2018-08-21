import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AuthLoginPage } from './auth-login';
import { BabyInputOverlayComponent } from '../../components/baby-input-overlay/baby-input-overlay';

@NgModule({
  declarations: [
    AuthLoginPage,
    BabyInputOverlayComponent
  ],
  imports: [
    IonicPageModule.forChild(AuthLoginPage),
    BabyInputOverlayComponent
  ],
})
export class AuthLoginPageModule {}
