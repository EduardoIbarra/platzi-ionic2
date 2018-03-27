import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {PlacePage} from "../place/place";
import {PlacesService} from "../../services/places.service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  lugares: any = [];
  constructor(public navCtrl: NavController, private placesService: PlacesService) {
    this.placesService.getPlaces().valueChanges()
      .subscribe((places)=>{
        this.lugares = places;
        console.log(this.lugares);
      });
  }
  irALugar(placeName){
    this.navCtrl.push(PlacePage, {name: placeName});
  }
}
