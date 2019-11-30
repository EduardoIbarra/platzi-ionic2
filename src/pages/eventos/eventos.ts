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
  query: string = '';
  showPrevious = false;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public eventosService: EventsService) {
    this.eventosService.getEvents()
      .valueChanges().subscribe((eventos)=>{
      this.eventos = eventos;
      this.eventos.forEach((e) => {
        e.pureDate = new Date(e.dateStarts).getTime()|0;
      });
      this.eventos.sort(function(a,b) {return (a.pureDate > b.pureDate) ? 1 : ((b.pureDate > a.pureDate) ? -1 : 0);} );
      console.log(this.eventos);
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
  shouldDisplay(item){
    return !!(new Date(item.dateStarts) > new Date());
  }

}
