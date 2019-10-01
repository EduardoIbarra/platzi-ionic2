import { Component } from '@angular/core';
import {ModalController, NavController, NavParams} from 'ionic-angular';
import {CVisitTypes, IVisitType} from "../../constants/visit-type";
import {CStreets, Street} from "../../constants/streets";
import {VisitsService} from "../../services/visits.service";
import {VisitCreationResultPage} from "../../modals/visit-creation-result/visit-creation-result";
import {UsersService} from "../../services/users.service";


/**
 * Generated class for the VisitNewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-place',
  templateUrl: 'visit-new.html',
})
export class VisitNewPage {
  visit: any = {};
  visitTypes: IVisitType[] = CVisitTypes;
  streets: Street[] = CStreets;
  times: string[] = ['Mañana', 'Tarde', 'Noche', 'N/A'];
  minDate: string = new Date().toISOString();
  isGuard: any = {};
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private modalCtrl: ModalController,
              private visitsService: VisitsService,
              private usersService: UsersService,
  ) {
    this.visit = navParams.get('lugar') || {};
    this.isGuard = this.usersService.getUserValueFromLocalStorage('isGuard');
    if (!this.isGuard) {
      const addressKey = this.usersService.getUserValueFromLocalStorage('address_key');
      const address = this.usersService.parseAddressFromStreetKey(addressKey);
      this.visit.street = address.street;
      this.visit.street_number = address.number;
    }
  }
  ionViewDidLoad() {
    this.visit.date = this.minDate;
    console.log('ionViewDidLoad VisitNewPage');
  }
  save(){
    if (!this.visit.date) {
      alert('Debe ingresar una fecha');
      return;
    }
    if(
      !this.visit.visited_name ||
      !this.visit.street ||
      !this.visit.street_number ||
      !this.visit.visitor_name ||
      !this.visit.type ||
      !this.visit.date
    ){
      alert('Los campos marcados con * son requeridos, favor de llenarlos');
      return;
    }
    if(!this.visit.timestamp){
      this.visit.timestamp = Date.now();
      this.visit.visited = false;
    }
    console.log(this.visit);
    const path = this.visitsService.buildPath(this.visit);
    this.visit.path = path;
    this.visitsService.createVisit(path, this.visit).then(()=>{
      this.presentModal(path);
    });
  }
  presentModal(path) {
    this.navCtrl.pop().then((data) => {
      const modal = this.modalCtrl.create(VisitCreationResultPage, {path: path});
      modal.present();
    }).catch((error) => {
      console.log(error);
    });
  }
}
