import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyBabyPage } from './my-baby';

@NgModule({
  declarations: [
    MyBabyPage,
  ],
  imports: [
    IonicPageModule.forChild(MyBabyPage),
  ],
})
export class MyBabyPageModule {}
