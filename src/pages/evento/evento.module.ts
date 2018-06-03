import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventoPage } from './evento';

@NgModule({
  declarations: [
    EventoPage,
  ],
  imports: [
    IonicPageModule.forChild(EventoPage),
  ],
})
export class EventoPageModule {}
