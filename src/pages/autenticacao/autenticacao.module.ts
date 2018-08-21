import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AutenticacaoPage } from './autenticacao';

@NgModule({
  declarations: [
    AutenticacaoPage,
  ],
  imports: [
    IonicPageModule.forChild(AutenticacaoPage),
  ],
})
export class AutenticacaoPageModule {}
