import { Component } from '@angular/core';
import {AlertController, ModalController, NavController, NavParams} from 'ionic-angular';
import {TerceraPage} from "../tercera/tercera";
import {AnnouncementsService} from "../../services/announcements.service";
import {CorrectInfoPage} from "../correct-info/correct-info";

/**
 * Generated class for the AnnouncementPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-announcement',
  templateUrl: 'announcement.html',
})
export class AnnouncementPage {
  announcementName: any = null;
  lugar: any = {};
  constructor(public navCtrl: NavController, public navParams: NavParams, private announcementsService: AnnouncementsService, private alertCtrl: AlertController,
              private modalCtrl: ModalController) {
    this.lugar = navParams.get('lugar') || {};
  }

  navigateBack() {
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AnnouncementPage');
  }
  goToThird(){
    this.navCtrl.push(TerceraPage);
  }
  guardarLugar(){
    if(!this.lugar.id){
      this.lugar.id = Date.now();
    }
    this.announcementsService.createAnnouncement(this.lugar).then(()=>{
      let alert = this.alertCtrl.create({
        title: 'Contacto Guardado con Éxito',
        buttons: ['Ok']
      });
      alert.present();
      this.navCtrl.pop();
    });
  }
  presentModal() {
    let modal = this.modalCtrl.create(CorrectInfoPage, {lugar: this.lugar});
    modal.present();
  }
}
