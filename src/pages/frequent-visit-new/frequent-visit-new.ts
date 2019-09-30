import { Component } from '@angular/core';
import {AlertController, NavController, NavParams} from 'ionic-angular';
import {CVisitTypes, IVisitType} from "../../constants/visit-type";
import {VisitsService} from "../../services/visits.service";
import {UsersService} from "../../services/users.service";

/**
 * Generated class for the VisitNewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'frequent-visit-new',
  templateUrl: 'frequent-visit-new.html',
})
export class FrequentVisitNewPage {
  visit: any = {};
  visitTypes: IVisitType[] = CVisitTypes;
  minDate: string = new Date().toISOString();
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private alertCtrl: AlertController,
              private visitsService: VisitsService,
              private usersService: UsersService,
  ) {
    this.visit = navParams.get('lugar') || {};
    this.visit.addressKey = this.usersService.getUserValueFromLocalStorage('address_key');
    const address = this.usersService.parseAddressFromStreetKey(this.visit.addressKey);
    this.visit.street = address.street;
    this.visit.street_number = address.number;
  }
  ionViewDidLoad() {
    this.visit.date = this.minDate;
    console.log('ionViewDidLoad VisitNewPage');
  }
  save(){
    if(!this.visit.id){
      this.visit.timestamp = Date.now();
      this.visit.visited = false;
    }
    this.visit.path = `frequent_visits/${this.visit.addressKey}/${this.visit.timestamp}`;
    this.visitsService.createFrequentVisit(this.visit).then(()=>{
      let alert = this.alertCtrl.create({
        title: 'Registro de visita guardado con éxito',
        buttons: ['Ok']
      });
      alert.present();
      this.navCtrl.pop();
    });
  }
}
