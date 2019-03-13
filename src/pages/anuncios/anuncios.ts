import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {AnnouncementsService} from "../../services/announcements.service";
import {AnnouncementEditPage} from "../announcement-edit/announcement-edit";
import {AnnouncementPage} from "../announcement/announcement";

/**
 * Generated class for the AnunciosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-anuncios',
  templateUrl: 'anuncios.html',
})
export class AnunciosPage {
  anuncios: any = [];
  query: string = '';
  constructor(public navCtrl: NavController, private announcementsService: AnnouncementsService, private alertCtrl: AlertController) {
    this.announcementsService.getAnnouncements().valueChanges()
      .subscribe((announcements)=>{
        this.anuncios = announcements;
      });
  }
  irAAnuncio(announcementName){
    if(localStorage.getItem('admin') != 'true'){
      alert('Usted no tiene acceso para crear anuncios, contacte a su representante');
      return;
    }
    if(localStorage.getItem('admin')){
      this.navCtrl.push(AnnouncementEditPage, {name: announcementName});
    }else{
      this.navCtrl.push(AnnouncementPage, {name: announcementName});
    }
  }
  seleccionarAnuncio(anuncio){
    if(localStorage.getItem('admin')){
      this.navCtrl.push(AnnouncementEditPage, {anuncio: anuncio});
    }else{
      this.navCtrl.push(AnnouncementPage, {anuncio: anuncio});
    }
  }
  deleteItem(anuncio){
    if(!confirm('Seguro que deseas eliminar este contacto?')) {
      return;
    }
    if(!localStorage.getItem('admin')){
      alert('Usted no tiene acceso para eliminar anuncios, contacte a su representante');
      return;
    }
    this.announcementsService.deleteAnnouncement(anuncio).then(()=>{
      let alert = this.alertCtrl.create({
        title: 'Contacto Eliminado con Éxito',
        buttons: ['Ok']
      });
      alert.present();
    });
  }
}
