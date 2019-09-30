import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {BarcodeScanner} from "@ionic-native/barcode-scanner/ngx";

/**
 * Generated class for the VisitReadPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-place',
  templateUrl: 'visit-read.html',
})
export class VisitReadPage {
  visit: any = {};
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public barcodeScanner: BarcodeScanner,
              ) {
    this.visit = navParams.get('lugar') || {};
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad VisitReadPage');
  }
  scanQR() {
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data: ' + barcodeData.text);
      if(barcodeData.text){
        this.visit.code = barcodeData.text
      }
    }).catch(err => {
      console.log(err);
    });
  }
}
