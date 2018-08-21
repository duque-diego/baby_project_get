import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { ProfilePage } from '../profile/profile';
import { MyBabyPage } from '../my-baby/my-baby';
import { AlertsPage } from '../alerts/alerts';
import { PromotionsPage } from '../promotions/promotions';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = PromotionsPage;
  tab2Root = AlertsPage;
  tab3Root = MyBabyPage;
  tab4Root = ProfilePage;

  constructor() {

  }
}
