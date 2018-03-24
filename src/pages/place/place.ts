import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.placeName = navParams.get('name');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlacePage');
  }

}
