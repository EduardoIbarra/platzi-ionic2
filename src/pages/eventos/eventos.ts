import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EventsService } from '../../services/events.service';
import { EventoPage } from '../evento/evento';

/**
 * Generated class for the EventosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-eventos',
  templateUrl: 'eventos.html',
})
export class EventosPage {
  eventos: any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public eventosService: EventsService) {
    this.eventosService.getEvents()
      .valueChanges().subscribe((eventos)=>{
      this.eventos = eventos;
    });
  }
  isAdmin() {
    return !!(localStorage.getItem('admin'));
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad EventoPage');
  }
  nuevoEvento(){
    this.navCtrl.push(EventoPage, {event: 'new'});
  }
  itemSelected(evento){
    this.navCtrl.push(EventoPage, {event: evento});
  }

}
