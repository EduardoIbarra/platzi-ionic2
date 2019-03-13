import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AnunciosPage } from './anuncios';

@NgModule({
  declarations: [
    AnunciosPage,
  ],
  imports: [
    IonicPageModule.forChild(AnunciosPage),
  ],
})
export class AnunciosPageModule {}
