import { Component } from '@angular/core';
import {ModalController, NavController, NavParams} from 'ionic-angular';
import { LoginPage } from '../login/login';
import {UsersService} from "../../services/users.service";
import {MorososService} from "../../services/morosos.service";

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  password: string = '';
  user:any = {};
  details:any = {};
  addressDetails:any = {};
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public usersService: UsersService,
    public morososSerivce: MorososService,
  ) {
    this.user = JSON.parse(localStorage.getItem('asp_user'));
    if (!this.user) {
      return;
    }
    this.addressDetails = (this.user) ? this.usersService.parseAddressFromStreetKey(this.user.address_key) : null;
    this.morososSerivce.getMoroso(this.user.address_key).valueChanges().subscribe((data) => {
      this.user.moroso = data;
    }, (error) => {
      console.log(error);
    });
    console.log(this.user);
  }
  logout(){
    localStorage.removeItem('admin');
    localStorage.removeItem('asp_user');
    this.user = null;
    alert('Nos vemos pronto, vecin@!');
    location.reload();
  }
  showLogin() {
    let modal = this.modalCtrl.create(LoginPage);
    modal.present().then(() => {
      this.user = JSON.parse(localStorage.getItem('asp_user'));
    });
  }
  isLogged() {
    return !!this.user;
  }
  getUser() {
    this.usersService.getUser(this.user.uid).valueChanges().subscribe((user) => {
      this.user = user;
      localStorage.setItem('asp_user', JSON.stringify(this.user));
      alert('Usuario actualizado correctamente');
    });
  }
  registerPhoneNumber() {
    let phone = prompt("Ingrese su teléfono por favor:");
    phone = phone.replace(/\D+/g, '');
    if (!phone || phone.length < 7) {
      alert('Debe ingresar un número de teléfono válido');
      return;
    }
    this.usersService.setUserProperty('phone', phone, this.user.uid).then((data) => {
      this.getUser();
    }).catch((error) => {
      console.log(error);
    });
  }
}
