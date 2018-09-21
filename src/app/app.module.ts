import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { ComponentsModule } from '../components/components.module';
import { HttpClientModule} from "@angular/common/http";
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { AutenticacaoPage } from '../pages/autenticacao/autenticacao';
import { AuthLoginPage } from '../pages/auth-login/auth-login';
import { SignUpPage } from '../pages/sign-up/sign-up';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { ProfilePage } from '../pages/profile/profile';
import { MyBabyPage } from '../pages/my-baby/my-baby';
import { AlertsPage } from '../pages/alerts/alerts';
import { PromotionsPage } from '../pages/promotions/promotions';
import { ProductInfoPage } from '../pages/product-info/product-info';
import { SasMaskPipe } from "../pipes/sas-mask/sas-mask";
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Facebook } from '@ionic-native/facebook';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { RestApiProvider } from '../helpers/rest-api.provider';
import { ApiUserProvider } from '../providers/api-user/api-user-data';
import { ApiPromotionProvider } from '../providers/api-promotion/api-promotion';
import { ApiPreferenceProvider } from '../providers/api-preference/api-preference-data';
import { SasMaskDirective } from '../directives/sas-mask/sas-mask';
import { IonicStorageModule } from '@ionic/storage';
import { OneSignal } from '@ionic-native/onesignal';
import { BrMaskerModule } from 'brmasker-ionic-3';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    AutenticacaoPage,
    AuthLoginPage,
    SignUpPage,
    TutorialPage,
    ProfilePage,
    MyBabyPage,
    AlertsPage,
    PromotionsPage,
    ProductInfoPage,
    SasMaskDirective,
    SasMaskPipe
  ],
  exports: [
    SasMaskDirective,
    SasMaskPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    ComponentsModule,
    BrMaskerModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage, 
    AutenticacaoPage,
    AuthLoginPage,
    SignUpPage,
    TutorialPage,
    ProfilePage,
    MyBabyPage,
    AlertsPage,
    PromotionsPage,
    ProductInfoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    //Facebook,
    RestApiProvider,
    ApiUserProvider,
    ApiPromotionProvider,
    ApiPreferenceProvider,
    InAppBrowser,
    OneSignal,
    
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
