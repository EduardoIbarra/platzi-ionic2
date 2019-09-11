import { Component } from '@angular/core';
import {AlertController, ModalController, NavController, NavParams} from 'ionic-angular';
import {PlacesService} from "../../services/places.service";
import {Camera} from "@ionic-native/camera";
import {CVisitTypes, IVisitType} from "../../constants/visit-type";
import {CStreets, Street} from "../../constants/streets";
import {VisitsService} from "../../services/visits.service";
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
  visitTypes: IVisitType[] = CVisitTypes;
  streets: Street[] = CStreets;
  times: string[] = ['Mañana', 'Tarde', 'Noche', 'N/A'];
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private placesService: PlacesService,
              private alertCtrl: AlertController,
              private modalCtrl: ModalController,
              private camera: Camera,
              public barcodeScanner: BarcodeScanner,
              private visitsService: VisitsService) {
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
