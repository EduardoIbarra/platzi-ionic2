import { Component } from '@angular/core';
import {AlertController, NavController, NavParams} from 'ionic-angular';
import {MorososService} from "../../services/morosos.service";
import {CStreets, Street} from '../../constants/streets';

/**
 * Generated class for the MorosoEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-moroso',
  templateUrl: 'moroso-edit.html',
})
export class MorosoEditPage {
  moroso: any = {};
  streets: Street[] = CStreets;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private morososService: MorososService,
              private alertCtrl: AlertController,) {
    const morosoParam = navParams.get('moroso') || {};
    this.moroso = morosoParam;
    this.moroso.street_number = morosoParam.address && morosoParam.address.addressKey.substring(3, 6);
    this.moroso.street = morosoParam.address && morosoParam.address.addressKey.substring(0, 3);
    console.log(this.moroso);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad MorosoEditPage');
  }
  guardarMoroso(){
    if (!this.moroso.street || !this.moroso.street_number || !this.moroso.debt) {
      alert('Todos los campos son requeridos');
      return;
    }
    this.morososService.createMoroso({
      address_key: `${this.moroso.street}${this.moroso.street_number}`,
      debt: this.moroso.debt,
    }).then(()=>{
      let alert = this.alertCtrl.create({
        title: 'Moroso Guardado con Éxito',
        buttons: ['Ok']
      });
      alert.present();
      this.navCtrl.pop();
    });
  }
}
