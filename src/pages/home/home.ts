import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {PlacePage} from "../place/place";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  notas: any = [
    {titulo:'Título 1', cuerpo: 'Cuerpo 1', categoria: 'Categoría 1'},
    {titulo:'Título 2', cuerpo: 'Cuerpo 2', categoria: 'Categoría 2'},
    {titulo:'Título 3', cuerpo: 'Cuerpo 3', categoria: 'Categoría 3'},
    {titulo:'Título 4', cuerpo: 'Cuerpo 4', categoria: 'Categoría 4'},
    {titulo:'Título 5', cuerpo: 'Cuerpo 5', categoria: 'Categoría 5'}
  ];
  constructor(public navCtrl: NavController) {

  }
  irALugar(placeName){
    this.navCtrl.push(PlacePage, {name: placeName});
  }
}
