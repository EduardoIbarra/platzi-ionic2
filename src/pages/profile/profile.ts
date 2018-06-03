import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }
  handlePassword(){
    if(this.password === this.correct_password){
      localStorage.setItem('admin', 'true');
      alert('Bienvenido');
    }
  }
  logout(){
    localStorage.removeItem('admin');
    alert('Adiós');
  }

}
