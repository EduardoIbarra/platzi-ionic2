import { Component } from '@angular/core';
import {AlertController, NavController} from 'ionic-angular';
import {MorososService} from "../../services/morosos.service";
import {UsersService} from "../../services/users.service";
import {MorosoEditPage} from '../moroso-edit/moroso-edit';

/**
 * Generated class for the MorososPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-morosos',
  templateUrl: 'morosos.html',
})
export class MorososPage {
  morosos: any = [];
  query: string = '';
  constructor(
    public navCtrl: NavController,
    private morososService: MorososService,
    private alertCtrl: AlertController,
    private usersService: UsersService,
  ) {
    this.morososService.getMorosos().valueChanges()
      .subscribe((morosos)=>{
        this.morosos = morosos;
        this.morosos = this.morosos.map(obj=> ({ ...obj, address: this.usersService.parseAddressFromStreetKey(obj.address_key) }));
      });
  }
  irAMoroso(morosoName){
    if(localStorage.getItem('admin') != 'true'){
      alert('Usted no tiene acceso para crear/editar morosos, contacte a su representante');
      return;
    }
    this.navCtrl.push(MorosoEditPage, {name: morosoName});

  }
  seleccionarMoroso(moroso){
    if(localStorage.getItem('admin') != 'true'){
      alert('Usted no tiene acceso para crear/editar morosos, contacte a su representante');
      return;
    }
    this.navCtrl.push(MorosoEditPage, {moroso: moroso});
  }
  deleteItem(moroso){
    if(!confirm('Seguro que deseas eliminar a este moroso?')) {
      return;
    }
    if(!localStorage.getItem('admin')){
      alert('Usted no tiene acceso para eliminar morosos, contacte a su representante');
      return;
    }
    this.morososService.deleteMoroso(moroso).then(()=>{
      let alert = this.alertCtrl.create({
        title: 'Moroso Eliminado con Éxito',
        buttons: ['Ok']
      });
      alert.present();
    });
  }
}
