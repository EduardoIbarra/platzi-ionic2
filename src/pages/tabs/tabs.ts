import { Component } from '@angular/core';
import {HomePage} from "../home/home";
import {ProfilePage} from "../profile/profile";
import {ModalController} from "ionic-angular";
import {LoginPage} from "../login/login";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ProfilePage;

  constructor(public modalCtrl: ModalController) {
    const user = JSON.parse(localStorage.getItem('usuario'));
    if(!user){
      let modal = this.modalCtrl.create(LoginPage);
      modal.present();
    }
  }
}
