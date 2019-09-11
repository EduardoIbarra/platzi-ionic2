import { Component } from '@angular/core';
import {AlertController, ModalController, NavController, NavParams} from 'ionic-angular';
import {PlacesService} from "../../services/places.service";
import {Camera} from "@ionic-native/camera";
import {CVisitTypes, IVisitType} from "../../constants/visit-type";
import {CStreets, Street} from "../../constants/streets";
import {VisitsService} from "../../services/visits.service";

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
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private placesService: PlacesService,
              private alertCtrl: AlertController,
              private modalCtrl: ModalController,
              private camera: Camera,
              private visitsService: VisitsService) {
    this.visit = navParams.get('lugar') || {};
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
    if(!this.visit.id){
      this.visit.timestamp = Date.now();
      this.visit.visited = false;
    }
    console.log(this.visit);
    const path = this.visitsService.buildPath(this.visit);
    console.log(path);
    this.visitsService.createVisit(path, this.visit).then(()=>{
      let alert = this.alertCtrl.create({
        title: 'Registro de visita guardado con éxito',
        buttons: ['Ok']
      });
      alert.present();
      this.navCtrl.pop();
    });
  }
}
