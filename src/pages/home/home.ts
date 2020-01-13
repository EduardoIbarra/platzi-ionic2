import { Component } from '@angular/core';
import {AlertController, NavController} from 'ionic-angular';
import {PlacePage} from "../place/place";
import {PlacesService} from "../../services/places.service";
import { PlaceEditPage } from '../place-edit/place-edit';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  lugares: any = [];
  query: string = '';
  isAdmin = false;
  constructor(public navCtrl: NavController, private placesService: PlacesService, private alertCtrl: AlertController) {
    this.placesService.getPlaces().valueChanges()
      .subscribe((places)=>{
        this.lugares = places;
      });
    this.isAdmin = JSON.parse(localStorage.getItem('admin'));
  }
  irALugar(placeName){
    if(!this.isAdmin){
      alert('Usted no tiene acceso para crear lugares, contacte a su representante');
      return;
    }
    if(localStorage.getItem('admin')){
      this.navCtrl.push(PlaceEditPage, {name: placeName});
    }else{
      this.navCtrl.push(PlacePage, {name: placeName});
    }
  }
  seleccionarLugar(lugar){
    if(localStorage.getItem('admin')){
      this.navCtrl.push(PlaceEditPage, {lugar: lugar});
    }else{
      this.navCtrl.push(PlacePage, {lugar: lugar});
    }
  }
  deleteItem(lugar){
    if(!confirm('Seguro que deseas eliminar este contacto?')) {
      return;
    }
    if(!localStorage.getItem('admin')){
      alert('Usted no tiene acceso para eliminar lugares, contacte a su representante');
      return;
    }
    this.placesService.deletePlace(lugar).then(()=>{
      let alert = this.alertCtrl.create({
        title: 'Contacto Eliminado con Éxito',
        buttons: ['Ok']
      });
      alert.present();
    });
  }
}
