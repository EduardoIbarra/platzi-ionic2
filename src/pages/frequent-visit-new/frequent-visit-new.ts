import { Component } from '@angular/core';
import {AlertController, ModalController, NavController, NavParams} from 'ionic-angular';
import {CVisitTypes, IVisitType} from "../../constants/visit-type";
import {VisitsService} from "../../services/visits.service";
import {UsersService} from "../../services/users.service";
import {VisitCreationResultPage} from "../../modals/visit-creation-result/visit-creation-result";

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
  user_name: string = '';
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private alertCtrl: AlertController,
              private visitsService: VisitsService,
              private usersService: UsersService,
              private modalCtrl: ModalController,
  ) {
    this.visit = navParams.get('lugar') || {};
    this.visit.addressKey = this.usersService.getUserValueFromLocalStorage('address_key');
    this.user_name = this.usersService.getUserValueFromLocalStorage('nombre');
    const address = this.usersService.parseAddressFromStreetKey(this.visit.addressKey);
    this.visit.street = address.street;
    this.visit.street_number = address.number;
    this.visit.visited_name = this.user_name;
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
      this.navCtrl.pop();
      this.presentModal(this.visit.path);
    });
  }
  presentModal(path) {
    const modal = this.modalCtrl.create(VisitCreationResultPage, {path: path});
    modal.present();
  }
}
