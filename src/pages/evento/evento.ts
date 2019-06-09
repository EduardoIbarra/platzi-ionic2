import { Component } from '@angular/core';
import {NavController, NavParams, ToastController} from 'ionic-angular';
import { EventsService } from '../../services/events.service';
import {UsersService} from "../../services/users.service";

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
  user:any = {};
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public eventsService: EventsService,
              private toastCtrl: ToastController,
              private usersService: UsersService) {
    if(navParams.get('event') !== 'new') {
      this.editing = true;
      this.event = navParams.get('event');
    }
    this.isAdmin = !!(localStorage.getItem('admin'));
    this.user = JSON.parse(localStorage.getItem('asp_user'));
    if (this.user) {
      this.getUser();
    }
    this.event.calle = this.user.street;
    this.event.numero = this.user.number;
  }

  zeroPad(number) {
    return ('0'+number).slice(-2);
  };

  ionViewDidLoad() {
  }
  getUser() {
    this.usersService.getUser(this.user.uid).valueChanges().subscribe((data) => {
      this.user = data;
    }, (error) => {
      console.log(error);
    });
  }
  saveEvent() {
    const date = new Date(this.event.dateStarts);
    this.event.id = date.getFullYear() + '' + this.zeroPad(date.getMonth()+1) + '' + this.zeroPad(date.getDate()+1);
    const subscription = this.eventsService.getEvent(this.event.id).valueChanges().subscribe((response) => {
      subscription.unsubscribe();
      console.log(response);
      if (response) {
        let toast = this.toastCtrl.create({
          message: 'ATENCIÓN: Ya hay un evento para esta fecha',
          duration: 3000,
          position: 'top'
        });
        toast.present();
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
