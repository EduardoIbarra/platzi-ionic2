import { Component } from '@angular/core';
import {AlertController, NavController, NavParams} from 'ionic-angular';
import {VisitsService} from "../../services/visits.service";
import {VisitType} from "../../constants/visit-type";
import {VisitNewPage} from "../visit-new/visit-new";

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
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public visitsService: VisitsService,
              public alertCtrl: AlertController) {
    this.visitsService.getVisits()
      .valueChanges().subscribe((visits_p)=>{
      this.addresses_visits = [];
      this.visits = visits_p;
      this.visits.forEach((address) => {
        const address_visits = Object.keys(address).map(i => address[i]);
        address_visits.forEach((visits) => {
          visits = Object.keys(visits).map(i => visits[i]);
          visits.forEach((v) => {
            this.addresses_visits.push(v);
          });
        })
      });
      this.addresses_visits = this.addresses_visits.map(obj=> ({ ...obj, visit_type: VisitType[obj.type] }));
      console.log(this.addresses_visits);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VisitsPage');
  }

  itemSelected(item){
    if(confirm('Desea marcar la visita como recibida?')) {
      const path = this.visitsService.buildPath(item);
      this.visitsService.setAsVisited(path).then(()=>{
        let alert = this.alertCtrl.create({
          title: 'Visita recibida con éxito',
          buttons: ['Ok']
        });
        alert.present();
      });
    }
  }

  irALugar(placeName){
    if(localStorage.getItem('admin') != 'true'){
      alert('Usted no tiene acceso para crear visitas, contacte a su representante');
      return;
    }
    this.navCtrl.push(VisitNewPage, {name: placeName});
  }

}
