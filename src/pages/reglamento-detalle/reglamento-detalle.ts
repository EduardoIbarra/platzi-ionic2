import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ReglamentoDetallePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-reglamento-detalle',
  templateUrl: 'reglamento-detalle.html',
})
export class ReglamentoDetallePage {
  reglamento: any = {};
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.reglamento = this.navParams.get('reglamento');
    console.log(this.reglamento);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReglamentoDetallePage');
  }

}
