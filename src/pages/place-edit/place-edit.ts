import { Component } from '@angular/core';
import {AlertController, ModalController, NavController, NavParams} from 'ionic-angular';
import {TerceraPage} from "../tercera/tercera";
import {PlacesService} from "../../services/places.service";
import {CorrectInfoPage} from "../correct-info/correct-info";
import {Camera, CameraOptions} from "@ionic-native/camera";

/**
 * Generated class for the PlaceEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-place',
  templateUrl: 'place-edit.html',
})
export class PlaceEditPage {
  placeName: any = null;
  lugar: any = {};
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private placesService: PlacesService,
              private alertCtrl: AlertController,
              private modalCtrl: ModalController,
              private camera: Camera) {
    this.lugar = navParams.get('lugar') || {};
  }
  navigateBack() {
    this.navCtrl.pop();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad PlaceEditPage');
  }
  goToThird(){
    this.navCtrl.push(TerceraPage);
  }
  guardarLugar(){
    if(!this.lugar.id){
      this.lugar.id = Date.now();
    }
    this.placesService.createPlace(this.lugar).then(()=>{
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
      this.lugar.pictures =  image;
    } catch (e) {
      console.error(e);
    }
  }
}
