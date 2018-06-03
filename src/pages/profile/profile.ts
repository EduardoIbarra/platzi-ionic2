import { Component } from '@angular/core';
import { ModalController, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';

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
  correct_password: string = 'b9124853d8';
  user:any = {};
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public modalCtrl: ModalController) {
    this.user = JSON.parse(localStorage.getItem('asp_user'));
    console.log(this.user);
  }
  handlePassword(){
    if(this.password === this.correct_password){
      localStorage.setItem('admin', 'true');
      alert('Bienvenido');
    }
  }
  logout(){
    localStorage.removeItem('admin');
    localStorage.removeItem('asp_user');
    this.user = null;
    alert('Adiós');
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
