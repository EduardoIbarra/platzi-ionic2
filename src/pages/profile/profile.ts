import { Component } from '@angular/core';
import { ModalController, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import {UsersService} from "../../services/users.service";

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
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public modalCtrl: ModalController, public usersService: UsersService) {
    this.user = JSON.parse(localStorage.getItem('asp_user'));
    this.addressDetails = (this.user) ? this.usersService.parseAddressFromStreetKey(this.user.address_key) : null;
    console.log(this.user);
  }
  logout(){
    localStorage.removeItem('admin');
    localStorage.removeItem('asp_user');
    this.user = null;
    alert('Nos vemos pronto, vecin@!');
  }
  showLogin() {
    let modal = this.modalCtrl.create(LoginPage);
    modal.present().then(() => {
      this.user = JSON.parse(localStorage.getItem('asp_user'));
      console.log(this.user);
    });
  }
  getUser() {
    this.user = JSON.parse(localStorage.getItem('asp_user'));
    return this.user;
  }
}
