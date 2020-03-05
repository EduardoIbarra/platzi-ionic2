import { Component } from '@angular/core';
import {AlertController, LoadingController, NavController, NavParams} from 'ionic-angular';
import {UsersService} from "../../services/users.service";
import {BarcodeScanner} from "@ionic-native/barcode-scanner";
import {VisitsService} from "../../services/visits.service";
import {MorososService} from "../../services/morosos.service";

/**
 * Generated class for the VisitReadPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-visit-read-new',
  templateUrl: 'visit-read-new.html',
})
export class VisitReadNewPage {
  visit: any = {};
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public barcodeScanner: BarcodeScanner,
              public usersService: UsersService,
              public visitsService: VisitsService,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
  ) {
  }
  ionViewDidLoad() {
    // this.searchVisit('visits/2019_9_30/500220/1569897619416');
  }
  async searchVisit(path) {
    const loading = this.loadingCtrl.create({
      content: 'Por favor espere...'
    });
    loading.present();
    this.visitsService.scanVisit(path).subscribe((data) => {
      this.visit = data;
      loading.dismiss();
    }, (error) => {
      if (error && error.error && error.error.error) {
        alert(`Error: ${error.error.error}`);
      } else {
        alert(`Ocurrió un error ${error.message}`);
      }
      console.log(error);
      loading.dismiss();
    });
  }
  scanQR() {
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data: ' + barcodeData.text);
      if(barcodeData.text){
        this.searchVisit(barcodeData.text);
      }
    }).catch(err => {
      console.log(err);
    });
  }
  confirmVisit(){
    if(confirm('Desea marcar la visita como recibida?')) {
      this.visitsService.registerVisit(this.visit).subscribe((data) => {
        let alert = this.alertCtrl.create({
          title: 'Visita recibida con éxito',
          buttons: ['Ok']
        });
        alert.present().then(() => this.visit = {});
        console.log(data);
      }, (error) => {
        alert('Ocurrió un error al recibir la visita: ' + JSON.stringify(error));
        console.log(error);
      });
    }
  }
}
