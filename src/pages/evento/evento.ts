import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EventsService } from '../../services/events.service';

/**
 * Generated class for the EventoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-evento',
  templateUrl: 'evento.html',
})
export class EventoPage {
  calles: any = [
    'San Luis',
    'San Mateo',
    'San Lázaro',
    'San Agustín',
    'San Roberto',
    'San Andrés'
  ];
  types: any = [
    'Palapa',
    'Junta'
  ];
  event: any = {
    calle: null,
    numero: null,
    dateStarts: null,
    timeStarts: null,
    timeEnds: null,
    nombre: null,
    telefono: null,
    type: null
  };
  editing = false;
  isAdmin = false;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public eventsService: EventsService) {
    if(navParams.get('event') !== 'new') {
      this.editing = true;
      this.event = navParams.get('event');
    }
    this.isAdmin = !!(localStorage.getItem('admin'));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventoPage');
  }
  saveEvent() {
    if(!this.event.id) {
      this.event.id = Date.now();
    }
    this.eventsService.createEvent(this.event).then(() => {
      alert('Evento creado con éxito');
      this.navCtrl.pop();
    }).catch(() => {
      alert('Error al crear evento');
    });
  }
  deleteEvent() {
    if(!confirm('Desea Eliminar este evento?')){
      return;
    }
    this.eventsService.deleteEvent(this.event).then(() => {
      alert('Evento eliminado con éxito');
      this.navCtrl.pop();
    }).catch(() => {
      alert('Error al eliminar evento');
    });
  }

}
