import { Component } from '@angular/core';
import {AlertController, LoadingController, ModalController, NavController, NavParams} from 'ionic-angular';
import {VisitsService} from "../../services/visits.service";
import {VisitType} from "../../constants/visit-type";
import {VisitNewPage} from "../visit-new/visit-new";
import {UsersService} from "../../services/users.service";
import {VisitCreationResultPage} from "../../modals/visit-creation-result/visit-creation-result";
import {combineLatest} from "rxjs/observable/combineLatest";
import {MorososService} from "../../services/morosos.service";

/**
 * Generated class for the VisitsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-visits-guard',
  templateUrl: 'visits-guard.html',
})
export class VisitsGuardPage {
  visits: any = [];
  addresses_visits: any = [];
  query: string = '';
  isGuard: boolean = false;
  searchResult: any = [];
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public visitsService: VisitsService,
              public alertCtrl: AlertController,
              public usersService: UsersService,
              public modalCtrl: ModalController,
              public loadingCtrl: LoadingController
  ) {
    this.isGuard = this.usersService.getUserValueFromLocalStorage('isGuard');
    this.addresses_visits = [];
  }

  searchByKeyword(event) {
    const loading = this.loadingCtrl.create({
      content: 'Por favor espere...'
    });

    loading.present();
    this.visitsService.searchVisit(event.target.value).subscribe((data) => {
      this.searchResult = data;
      loading.dismiss();
    }, (error) => {
      alert(`Ocurrió un error ${error}`);
      console.log(error);
      loading.dismiss();
    });
  }

  itemSelected(item){
    if (!this.isGuard) {
      this.presentModal(item.path);
    } else {
      const marbete = prompt("Ingrese por favor el número de marbete, o un 0 si no aplica");
      if(marbete !== null) {
        item.marbete = marbete;
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
