import { Component } from '@angular/core';
import {AlertController, ModalController, NavController, NavParams} from 'ionic-angular';
import {VisitsService} from "../../services/visits.service";
import {VisitType} from "../../constants/visit-type";
import {UsersService} from "../../services/users.service";
import {FrequentVisitNewPage} from "../frequent-visit-new/frequent-visit-new";
import {VisitCreationResultPage} from "../../modals/visit-creation-result/visit-creation-result";

/**
 * Generated class for the VisitsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-frequent-visits',
  templateUrl: 'frequent-visits.html',
})
export class FrequentVisitsPage {
  frequent_visits: any = [];
  query: string = '';
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public visitsService: VisitsService,
              public alertCtrl: AlertController,
              public usersService: UsersService,
              public modalCtrl: ModalController,
              ) {
    const address_key = usersService.getUserValueFromLocalStorage('address_key');
    this.visitsService.getFrequentVisitsByAddressKey(address_key)
      .valueChanges().subscribe((frequentVisits)=>{
        console.log(frequentVisits);
      this.frequent_visits = frequentVisits;
      this.frequent_visits = this.frequent_visits.map(obj=> ({ ...obj, visit_type: VisitType[obj.type] }));
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VisitsPage');
  }

  itemSelected(item){
    this.presentModal(item.path);
  }

  newFrequentVisit() {
    this.navCtrl.push(FrequentVisitNewPage);
  }

  presentModal(path) {
    const modal = this.modalCtrl.create(VisitCreationResultPage, {path: path});
    modal.present();
  }
}
