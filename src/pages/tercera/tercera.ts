import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HomePage} from "../home/home";

/**
 * Generated class for the TerceraPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tercera',
  templateUrl: 'tercera.html',
})
export class TerceraPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TerceraPage');
  }
  goHome(){
    this.navCtrl.push(HomePage);
  }
  setHomeAsRoot(){
    this.navCtrl.setRoot(HomePage);
  }

}
