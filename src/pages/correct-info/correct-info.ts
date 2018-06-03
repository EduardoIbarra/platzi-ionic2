import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {SuggestionsService} from "../../services/suggestions.service";

/**
 * Generated class for the CorrectInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-correct-info',
  templateUrl: 'correct-info.html',
})
export class CorrectInfoPage {
  lugar: any = {};
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public viewCtrl: ViewController, public suggestionsService: SuggestionsService) {
    this.lugar.lugar_id = navParams.get('lugar').id;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CorrectInfoPage');
  }
  dismiss(){
    this.viewCtrl.dismiss();
  }
  enviarCambios(){
    this.lugar.id = Date.now();
    this.suggestionsService.createSuggestion(this.lugar).then(()=>{
      alert('Tu reporte ha sido recibido!');
      this.viewCtrl.dismiss();
    });
  }

}
