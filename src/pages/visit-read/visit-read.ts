import { Component } from '@angular/core';
import {AlertController, NavController, NavParams} from 'ionic-angular';
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
  selector: 'page-place',
  templateUrl: 'visit-read.html',
})
export class VisitReadPage {
  visit: any = {};
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public barcodeScanner: BarcodeScanner,
              public usersService: UsersService,
              public visitsService: VisitsService,
              public alertCtrl: AlertController,
              public morososService: MorososService,
  ) {
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad VisitReadPage');
  }
  scanQR() {
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data: ' + barcodeData.text);
      if(barcodeData.text){
        this.usersService.getByPath(barcodeData.text).valueChanges().subscribe((visit) => {
          this.visit = visit;
          if(!this.visit || !this.visit.street || !this.visit.street.code) {
            return;
          }
          this.morososService.getMoroso(`${this.visit.street.code}${this.visit.street_number}`)
            .valueChanges().subscribe((data) => {
            this.visit.moroso = data;
          }, (error) => {
            console.log(error);
          });
        });
      }
    }).catch(err => {
      console.log(err);
    });
  }
  confirmVisit(){
    if(confirm('Desea marcar la visita como recibida?')) {
      this.visitsService.setAsVisited(this.visit).then(()=>{
        let alert = this.alertCtrl.create({
          title: 'Visita recibida con éxito',
          buttons: ['Ok']
        });
        alert.present().then(() => this.visit = {});
      });
    }
  }
}
