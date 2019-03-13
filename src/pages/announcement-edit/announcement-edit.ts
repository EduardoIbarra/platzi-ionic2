import { Component } from '@angular/core';
import {AlertController, ModalController, NavController, NavParams} from 'ionic-angular';
import {TerceraPage} from "../tercera/tercera";
import {AnnouncementsService} from "../../services/announcements.service";
import {CorrectInfoPage} from "../correct-info/correct-info";
import {Camera, CameraOptions} from "@ionic-native/camera";

/**
 * Generated class for the AnnouncementEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-announcement',
  templateUrl: 'announcement-edit.html',
})
export class AnnouncementEditPage {
  announcementName: any = null;
  anuncio: any = {};
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private announcementsService: AnnouncementsService,
              private alertCtrl: AlertController,
              private modalCtrl: ModalController,
              private camera: Camera) {
    this.anuncio = navParams.get('anuncio') || {};
  }
  navigateBack() {
    this.navCtrl.pop();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AnnouncementEditPage');
  }
  goToThird(){
    this.navCtrl.push(TerceraPage);
  }
  guardarLugar(){
    if(!this.anuncio.id){
      this.anuncio.id = Date.now();
    }
    this.announcementsService.createAnnouncement(this.anuncio).then(()=>{
      let alert = this.alertCtrl.create({
        title: 'Contacto Guardado con Éxito',
        buttons: ['Ok']
      });
      alert.present();
      this.navCtrl.pop();
    });
  }
  async takePicture(source) {
    try {
      let cameraOptions: CameraOptions = {
        quality: 50,
        // targetWidth: 800,
        // targetHeight: 800,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        correctOrientation: true,
        allowEdit: true
      };
      cameraOptions.sourceType = (source == 'camera') ?  this.camera.PictureSourceType.CAMERA : this.camera.PictureSourceType.PHOTOLIBRARY;
      const result = await this.camera.getPicture(cameraOptions);
      const image = `data:image/jpeg;base64,${result}`;
      this.anuncio.pictures =  image;
    } catch (e) {
      console.error(e);
    }
  }
}
