import { Component } from '@angular/core';
import {AlertController, NavController} from 'ionic-angular';
import {PlacePage} from "../place/place";
import {PlacesService} from "../../services/places.service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  lugares: any = [];
  constructor(public navCtrl: NavController, private placesService: PlacesService, private alertCtrl: AlertController) {
    this.placesService.getPlaces().valueChanges()
      .subscribe((places)=>{
        this.lugares = places;
        console.log(this.lugares);
      });
  }
  irALugar(placeName){
    this.navCtrl.push(PlacePage, {name: placeName});
  }
  seleccionarLugar(lugar){
    this.navCtrl.push(PlacePage, {lugar: lugar});
  }
  deleteItem(lugar){
    this.placesService.deletePlace(lugar).then(()=>{
      let alert = this.alertCtrl.create({
        title: 'Nota Eliminada con Éxito',
        buttons: ['Ok']
      });
      alert.present();
    });
  }
}
