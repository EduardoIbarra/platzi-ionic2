import { Component } from '@angular/core';
import {AlertController, ModalController, NavController, NavParams} from 'ionic-angular';
import {VisitsService} from "../../services/visits.service";
import {VisitType} from "../../constants/visit-type";
import {VisitNewPage} from "../visit-new/visit-new";
import {UsersService} from "../../services/users.service";
import {VisitCreationResultPage} from "../../modals/visit-creation-result/visit-creation-result";
import {combineLatest} from "rxjs/observable/combineLatest";

/**
 * Generated class for the VisitsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-visits',
  templateUrl: 'visits.html',
})
export class VisitsPage {
  visits: any = [];
  addresses_visits: any = [];
  query: string = '';
  isGuard: boolean = false;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public visitsService: VisitsService,
              public alertCtrl: AlertController,
              public usersService: UsersService,
              public modalCtrl: ModalController,
  ) {
    this.isGuard = this.usersService.getUserValueFromLocalStorage('isGuard');
    this.addresses_visits = [];
    if (this.isGuard) {
      let today: any = new Date(Date.now());
      today = this.visitsService.getStringDate(today);
      combineLatest(this.visitsService.getVisitsForDate(today).valueChanges(), this.visitsService.getFrequentVisits().valueChanges()).subscribe(([visits_p, addresses_p]) => {
        this.addresses_visits = [];
        this.visits = visits_p;
        this.visits.forEach((addresses) => {
          const address_visits = Object.keys(addresses).map(function(key) {
            return addresses[key];
          });
          address_visits.forEach(visit => this.addresses_visits.push(visit));
        });

        addresses_p = Object.keys(addresses_p).map(function(key) {
          return addresses_p[key];
        });
        addresses_p.forEach(address => {
          const visits = Object.keys(address).map(function(key) {
            return address[key];
          });
          visits.forEach((v) => this.addresses_visits.push(({ ...v, frequent: true })));
        });
        this.addresses_visits = this.addresses_visits.map(obj=> ({ ...obj, visit_type: VisitType[obj.type] }));
      });
    } else {
      const addressKey = this.usersService.getUserValueFromLocalStorage('address_key');
      this.visitsService.getVisitsForAddressKey(addressKey)
        .valueChanges().subscribe((visits_p)=>{
        this.addresses_visits = visits_p.map((obj:any)=> ({ ...obj, visit_type: VisitType[obj.type] }));
      });
    }
  }

  itemSelected(item){
    if (!this.isGuard) {
      this.presentModal(item.path);
    } else {
      if(confirm('Desea marcar la visita como recibida?')) {
        this.visitsService.setAsVisited(item).then(()=>{
          let alert = this.alertCtrl.create({
            title: 'Visita recibida con éxito',
            buttons: ['Ok']
          });
          alert.present();
        });
      }
    }
  }

  irALugar(placeName){
    const isVerified = this.usersService.getUserValueFromLocalStorage('isVerified');
    if (!isVerified) {
      alert('Su cuenta aun no ha sido verificada y no puede registrar visitas aún. Favor de contactar al administrador del app o a miembros del comité.');
      return;
    }
    this.navCtrl.push(VisitNewPage, {name: placeName});
  }

  presentModal(path) {
    const modal = this.modalCtrl.create(VisitCreationResultPage, {path: path});
    modal.present();
  }

  deleteVisit(item) {
    if(!confirm('Seguro que desea eliminar esta visita?')) {
      return;
    }
    this.visitsService.deleteVisit(item.path).then((data) => {
      alert('Visita eliminada con éxito');
    }).catch((error) => {
      console.log(error);
    });
  }
}
