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

  zeroPad(number) {
    return ('0'+number).slice(-2);
  };

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventoPage');
  }
  saveEvent() {
    const date = new Date(this.event.dateStarts);
    this.event.id = date.getFullYear() + '' + this.zeroPad(date.getMonth()+1) + '' + this.zeroPad(date.getDate());
    const subscription = this.eventsService.getEvent(this.event.id).valueChanges().subscribe((response) => {
      subscription.unsubscribe();
      console.log(response);
      if (response) {
        alert('Ya hay un evento para esta fecha');
        return;
      }
      this.event.created_at = Date.now();
      this.doSave();
    });
  }
  doSave() {
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
