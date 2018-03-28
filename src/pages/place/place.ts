import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {TerceraPage} from "../tercera/tercera";
import {PlacesService} from "../../services/places.service";

/**
 * Generated class for the PlacePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-place',
  templateUrl: 'place.html',
})
export class PlacePage {
  placeName: any = null;
  lugar: any = {};
  constructor(public navCtrl: NavController, public navParams: NavParams, private placesService: PlacesService, private alertCtrl: AlertController) {
    this.lugar = navParams.get('lugar') || {};
  }

  navigateBack() {
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlacePage');
  }
  goToThird(){
    this.navCtrl.push(TerceraPage);
  }
  guardarLugar(){
    if(!this.lugar.id){
      const user = JSON.parse(localStorage.getItem('usuario'));
      this.lugar.id = Date.now();
      this.lugar.usuario = user.uid;
    }
    this.placesService.createPlace(this.lugar).then(()=>{
      let alert = this.alertCtrl.create({
        title: 'Nota Guardada con Éxito',
        buttons: ['Ok']
      });
      alert.present();
      this.navCtrl.pop();
    });
  }
}
