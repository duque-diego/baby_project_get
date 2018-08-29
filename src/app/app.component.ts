import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { OneSignal } from '@ionic-native/onesignal';


//import { TabsPage } from '../pages/tabs/tabs';
import { AutenticacaoPage } from '../pages/autenticacao/autenticacao';
import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(private oneSignal: OneSignal ,platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public storage:Storage) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      this.storage.get('userData')
                    .then(
                      data => {
                        if(data){
                          this.rootPage = TabsPage;
                        }else{
                          this.rootPage = AutenticacaoPage;
                        }                        
                      },
                      error => console.error(error)
                    );

      this.oneSignal.startInit('424528ff-b383-4315-8ab7-46029c170923', '609666401907');

      this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);
    
      this.oneSignal.handleNotificationReceived().subscribe(() => {
      // do something when notification is received
      });
    
      this.oneSignal.handleNotificationOpened().subscribe(() => {
        // do something when a notification is opened
      });
    
      this.oneSignal.endInit();
    });
  }

  
}
