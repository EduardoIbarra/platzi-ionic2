import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {ReglamentosService} from "../../services/reglamentos.service";
import {ReglamentoDetallePage} from "../reglamento-detalle/reglamento-detalle";

/**
 * Generated class for the ReglamentoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-reglamento',
  templateUrl: 'reglamento.html',
})
export class ReglamentoPage {
  reglamentos: any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public reglamentosService: ReglamentosService) {
    this.reglamentosService.getReglamentos()
      .valueChanges().subscribe((reglamentos)=>{
        this.reglamentos = reglamentos;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReglamentoPage');
  }

  itemSelected(item){
    console.log(item);
    this.navCtrl.push(ReglamentoDetallePage, {reglamento: item});
  }

}
