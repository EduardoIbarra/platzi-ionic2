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
  query: string = '';
  constructor(public navCtrl: NavController, private placesService: PlacesService, private alertCtrl: AlertController) {
    this.placesService.getPlaces().valueChanges()
      .subscribe((places)=>{
        this.lugares = places;
      });
  }
  irALugar(placeName){
    if(localStorage.getItem('admin') != 'true'){
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
    if(!localStorage.getItem('admin')){
      alert('Usted no tiene acceso para eliminar lugares, contacte a su representante');
      return;
    }
    this.placesService.deletePlace(lugar).then(()=>{
      let alert = this.alertCtrl.create({
        title: 'Nota Eliminada con Éxito',
        buttons: ['Ok']
      });
      alert.present();
    });
  }
}

import { Pipe, PipeTransform } from '@angular/core';
import {PlaceEditPage} from "../place-edit/place-edit";

@Pipe({
  name: 'myfilter',
  pure: false
})
export class MyFilterPipe implements PipeTransform {
  transform(items: any[], filter: string): any {
    if (!items || !filter) {
      return items;
    }
    // filter items array, items which match and return true will be
    // kept, false will be filtered out
    return items.filter(item => JSON.stringify(item).toLowerCase().indexOf(filter.toLowerCase()) !== -1);
  }
}

@Pipe({name: "sortBy"})
export class SortPipe {
  transform(array: Array<string>, args: string): Array<string> {
    array.sort((a: any, b: any) => {
      if ( a[args].toLowerCase() < b[args].toLowerCase() ){
        return -1;
      }else if( a[args].toLowerCase() > b[args].toLowerCase() ){
        return 1;
      }else{
        return 0;
      }
    });
    return array;
  }
}
