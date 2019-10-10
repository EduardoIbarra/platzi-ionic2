import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AnunciosPage } from './anuncios';
import {PipesModule} from "../../pipes/pipes.module";

@NgModule({
  declarations: [
    AnunciosPage,
  ],
  imports: [
    IonicPageModule.forChild(AnunciosPage),
    PipesModule,
  ],
})
export class AnunciosPageModule {}
