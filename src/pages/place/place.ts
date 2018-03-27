import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
  constructor(public navCtrl: NavController, public navParams: NavParams, private placesService: PlacesService) {
    this.placeName = navParams.get('name');
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
    this.lugar.id = Date.now();
    this.placesService.createPlace(this.lugar);
  }
}
